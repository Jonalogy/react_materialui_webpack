1. If User should be notified if login fails
2. If User should be notified if email format is not correct
3. If an Unauthenticated User attempts to navigated to other routes, he/she should not be re-directed back to login page
4. If an Authenticated User navigates to root route (eg: `<domain>/`), he should, by default, be navigated to `<domain>/dashboard`
5. If an Authenticated User navigates to a non-existent route, he should, by default, be navigated to `<domain>/dashboard`