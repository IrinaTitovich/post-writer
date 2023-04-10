import express, { Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
import { today, thisMonth, thisWeek, Post } from "../../posts";
import { NewUser, User } from "../../user";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const posts = [today, thisWeek, thisMonth];
const users: User[] = [];

const SECRET = "my-secret";
const COOKIE = "jwt";

app.post<unknown, unknown, Post>("/posts", (req, res) => {
  const post = { ...req.body, id: (Math.random() * 10000).toFixed() };
  posts.push(post);

  res.json(post);
});

app.put<unknown, unknown, Post>("/posts", (req, res) => {
  const updatedPost = { ...req.body };
  const index = posts.findIndex(({ id }) => id === updatedPost.id);

  posts[index] = updatedPost;

  res.json(posts[index]);
});

function autentification(id: string, res: Response) {
  const token = jsonwebtoken.sign({ id }, SECRET, {
    issuer: "IT",
    expiresIn: "30 days",
  });

  res.cookie(COOKIE, token, { httpOnly: true });
}

app.get("/current-user", (req, res) => {
  try {
    const token = req.cookies[COOKIE];
    const result = jsonwebtoken.verify(token, SECRET) as { id: string };

    res.json({ id: result.id });
  } catch (e) {
    res.status(404).end();
  }
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post<unknown, unknown, NewUser>("/users", (req, res) => {
  const user: User = { ...req.body, id: (Math.random() * 10000).toFixed() };
  users.push(user);
  autentification(user.id, res);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userResponse } = user;

  res.json({ userResponse });
});

app.post<unknown, unknown, NewUser>("/login", (req, res) => {
  const user = { ...req.body };

  const existingUser = users.find((u) => u.username === user.username);

  if (existingUser && user.password === existingUser.password) {
    autentification(existingUser.id, res);
    res.status(200).end();
  } else {
    res.status(401).end();
  }
});

app.post("/logout", (req, res) => {
  res.cookie(COOKIE, "", { httpOnly: true });
  res.status(200).end();
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
