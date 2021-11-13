# Problem

A viewer wants to skip an intro for the video they are watching. We want to show a skip button when it is appropriate and clicking on the button will skip the video to around 1s - 5s before the actual intro ends and also hide the skip button.

# Possible Solutions

1. **Video Capture:**: When a user starts a video, for the first `x` seconds we take frames at every `y` intervals an upload them to an API. When the API receives the first image it will hash the image and perform a look up to see if the image already exists in our repository.
   **1st Pass Image Exists**: We hash the images that are coming in from the client and compare them to each node in the image list. Once we have encountered the first image that is different, we then take the image list node where the difference occurs and use that as the end time for the intro and discard all image list nodes after it; we can also update the first reference in the image list with the end time. No users will be able to skip the video until this first pass happens on the back end.
   **Image Does Not Exist**: We will take all frames from the first frame to the last frame - could be first 30s of videos or more - and chain them together; the starting image will have a pointer to the next image like an image linked list. We will take a hash of each image similar to (this)[https://ourcodeworld.com/articles/read/1006/how-to-determine-whether-2-images-are-equal-or-not-with-the-perceptual-hash-in-python]. Retaining hashes is important for fast lookup the next time we need to search for an image.
   **2nd Pass Image Exists**: We get a hit for the starting sequence of the first image and there is a duration attached to the first image hash, so we can just return that duration.

   **Problems With Approach**

   1. We won't get an accurate intro end until two different episodes of a show have been watched. If we're on S1E1 of a show then the image list would have the same set of images for all users. Once the S1E2 airs then one of the images in the new stream will match the existing intro and we'll have a starting and ending point. We could delete the nodes before the start and after the end to save storage space.
   2. Some TV shows have intros that start some time later. So this would treat that as a new intro. Possible solution is for each frame we do a hash and lookup and if we reach the end, only then do we treat the entire sequence as a possible tv intro.
   3. If a show has credits in its intros and there is a modification, then that's an issue since it'll treat that frame as the end duration.

2. **Audio Capture**: Stream the audio from the client to the server. Perhaps perform some sort of audio analysis on the file? https://hackernoon.com/intro-to-audio-analysis-recognizing-sounds-using-machine-learning-qy2r3ufl But how would we do that as we are streaming? We would need to create the training set as described in this article if we take an ML approach: https://www.iotforall.com/tensorflow-sound-classification-machine-learning-applications

   **Problems with Approach**

   1. Creating the training set is annoying.
   2. ML won't really be learning from anything since each show will have its own intro. It'll only perform matching the incoming sound to what is in its training set.

3. **User Generated**: Create an element on the UI that will allow users to mark the start and end of an intro. Once they mark the end, we will also collect the show name. We can use the show name to get metadata about the show and store it with the start and end of the intro. Note: Would be good to combine this approach with the other 2 above so we can say: "How did we do?" and if they reply thumbs down then we show this UI next time and update accordingly.

   **Problems with Approach**

   1. User entered data might be inaccurate. We'll have to average out the start and end points marked by users to get an accurate one. If not many users watch a show or participate then it could be inaccurrate although it is in the best interest of the show watcher to give an accurate timing.
   2. How do you determine which show is playing? If you stream Game of Thrones on HBO vs some pirating site, how would you know generally that Game of Thrones is playing? It's unlikely the pirating site will tell you so it seems like some video analysis is still needed to map to known intro timings.
