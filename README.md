# Charter Communications Assessment

#### Please: `npm install`. 
#### Then: `npm run json:server` to load the live-server
#### In another terminal: `npm start`  to load the application.


## Totals Page (path='/')

Totals/Index Page that displays total points for every user within the last three months from current date (ie. if today is May 23, 2023, the points are tallied for transactions up to Feb 23, 2023 without including older dates the server provides). This is meant as an 'admin' page to see people's points.

## Transactions Page (path='/transactions')

The Transactions Page shows every transaction made in the last 3 months as it comes in from the database, regardless of user, order, etc. This is also meant as an 'admin' page.

## User Page (path='/id/:id')

The User page shows the three month total for a particular user leading up to the current date, ie. if today is May 23, 2023, the points filtered up to Feb 23, 2023 redardless what the server gives.

If the server gives unordered transactions, the data is also sorted by date for that particular user.

Each month's transactions details is stored in an object with the month name, an array of transactions, and the calculated monthly total. I wanted the month not to show if transactions weren't made that month. Therefore, some users can have as little as month showing and others as much as four months since their oldest transactions that show are still within the 3 month cutoff, ie. Feb 27 is within 3 months of May 23. The bottom of the page reflects the Three Month Total. 

**The application is scalable for any length of data and for any time of the year.**

## Testing

To test, run `npm run src/__tests__`

This tests each component as well as the calculatePoints function used to calculate points based on the parameters: A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every
dollar spent between $50 and $100 in each transaction.

