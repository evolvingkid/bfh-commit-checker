# bfh-commit-checker

An automated commit checker of github public repo

# setup

create and env file with token as

```text
AIRTABLE_API=<AIR TABLE TOKEN>
```

change your airtable base table id from config/default.json

```json
{
    "airtableBase" : "<BASE TABLE ID>"
}
```

# Run

Run this script on any node js server as a  cron job or forever (NPM package).

This will run every 1hr 10min to check commit of every user from airtable.

NOTE: this script will not afftect the github 50 request restruction.
