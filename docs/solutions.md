# Solution Brainstorming

- Get the first video element on the page. What should happen if there are multiple video elements?
- Parse out the frames of this video for the first 10 minutes of a show
    - Can we parse out the sound instead and compare it?
- Compare parsed frames for overlaps of a previous episode.
    - What if this is the first episode? Running this locally means that the user won't be able to skip. So need a way to determine which show's video is running.

- Train an ML algorithm on known show intros with the duration of the intro.
  - Where to get the data? Initial implementation can be manually entered data of popular shows by the creator.
    - Post-MVP: Create a UI on the video to crowd source entering when the user sees the intro. What does the user need to enter? Intro start only or both intro start and end? How about details of the show for more accuracy in the training data?
- Send the stream of video frames to an API that will run the ML algorithm against this stream of video frames. It will return the duration for the intro. The client will then seek to `current_position - duration`. If `current_position - duration < 0`then don't show UI to skip, otherwise show the UI and seek to `current_position + duration`.