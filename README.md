# Slack Points Bot (Serverless)

![Screenshot 2023-07-18 at 13 01 21](https://github.com/ehsanpo/slackbot-serverless/assets/2206592/81ff52ae-a266-45af-ab52-50dfc88658fd)

This bot helps you manage and distribute points to members of a Slack channel. It is built using serverless technology (Vercel Functions) and stores data using Upstash Redis.

## Features:

- Add or subtract points from a user using simple commands
- View a list of users and their respective points
- Give users a unique reward (e.g. "lime")

## Usage:

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
Note: The reward feature requires the user to have a "lime".

```
/p1 lime @username
```

Force change the point (for bugs and admin):

```
/p1 set @username 4
```

### Limitations:

- The list of front-end users (frontPpl) must be manually added.

```
/p1 list-set frontPpl @username
```

## Todos:

- who got the lime?
- Put in a “+1 for everyone except me”” command?

## Development

- Use `vercel dev` to start it localy.
- Use ngrok to make a tunnel to your localhost `ngrok http 3000`
- Then update a slash command in Slack website and add your ngrok url plus `/api/stats` and a command you like!
- When you done use `vercel deploy` and change to your production url in slash commands in slack website
