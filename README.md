# Movie Information Website

## What is it?

This is a website where users can access information about movies. Movie cards are dynamically updated with data fetched from the [TMDb API](https://api.themoviedb.org).

## Expected Behavior

- **Homepage:** Upon opening the website, users see a homepage with movie cards. 
- **Modal Window:** Clicking on any area of a movie card opens a modal window that occupies slightly more than half of the screen's width. 
  - The background behind the modal darkens, scrolling is disabled to prevent interaction with the page.
  - The modal displays detailed information about the selected movie, including:
    - Title
    - Poster
    - Rating
    - Year
    - Genre
    - Overview
- **Closing the Modal:** The modal can be closed by clicking the close button in the top-left corner of the modal or by clicking on the darkened background outside the modal. Once closed:
  - Scrolling functionality is restored.
  - The background dimming disappears.

## Responsiveness

The website dynamically adjusts its layout to provide a seamless experience on different screen sizes, ensuring compatibility across devices.

## Used API

The website fetches data from the [TMDb API](https://api.themoviedb.org) through three types of requests:
1. **Latest Movies:** To populate the homepage with a list of the latest movies.
2. **Movie Details:** To fetch detailed information for the modal window when a movie card is clicked.
3. **Search Functionality:** To search for movies using the search field.
