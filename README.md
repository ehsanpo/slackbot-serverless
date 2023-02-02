# Slack Points Bot (Serverless)

This bot helps you manage and distribute points to members of a Slack channel. It is built using serverless technology (Vercel Functions) and stores data using Upstash Redis.

Features:

- Add or subtract points from a user using simple commands
- View a list of users and their respective points
- Give users a unique reward (e.g. "lime")

Usage:

Add or subtract points:

```
/p1 +1 @username
/p1 -1 @username

```

View the list of users and their points:

```
/p1 list

```

Give a unique reward:

```
/p1 lime @username

```

Force change the point (for bugs and admin):

```
/p1 set @username 4

```

Note: The reward feature requires the user to have a "lime".

Limitations:

- The list of front-end users (frontPpl) must be manually added.

```
/p1 list-set frontPpl @username

```

Todos:

- who got the lime?
- Put in a “+1 for everyone except me”” command?
