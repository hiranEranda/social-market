function handleMoralisError(err) {
  switch (err.code) {
    case Moralis.Error.INVALID_SESSION_TOKEN:
      Moralis.User.logOut();
      // If web browser, render a log in screen
      // If Express.js, redirect the user to the log in route
      break;

    // Other Moralis API errors that you want to explicitly handle
  }
}
