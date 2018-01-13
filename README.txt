Author: Ian (ianH92)
Date: January 12th, 2018
Version: 1.0

README:

DESCRIPTION:
	Event calendar is a web application built using the Express.js web framework and running on the 
Node.js runtime environment. It uses MongoDB via the MongooseJS ODM to store users and events.
	Event calendar supports creating user accounts to store upcoming dates in a calendar which the
user can then view on the calendar. The application also allows creating dateless TODO events which
appear in a list sorted by TODO priority.

DESIGN:
	Event calendar supports authenticating users using Express-sessions and passport.js. Bcrypt is
used to hash user passwords before storing them in the database. Each user has their events stored 
in MongoDB database; these events are retrieved by the server to display for the users on request.
