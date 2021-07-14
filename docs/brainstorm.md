# Questions
0. How do we charge people?
   a. Per skip? We'll need to ensure that a skip for the same video doesn't count against them.
   b. Monthly/Yearly subscription? Flat cost depending on costs of hosting, video/audio processing, and other expenses.
   c. Ad based? We could inject an ad into the video during an intro. Might not be technically feasable depending on store extension policies.
   d. Per video/processing cost? Given that processing the video/audio may be the largest cost, it might make sense to charge based on gb processed.
   e. Free? Initially there won't be many users so we could shoulder the costs until a later date.
1. Which domains should the web extension run on?
   a. Running them on all domains would be nice but might pose a problem when trying to overlay the "Skip" button on videos. If we target specific domains then we'll have to architect the solution in a way that makes it scale to different domains on a per domain basis.
      Cons: Per domain means the solution is not as flexible and will frustrate users when its not available for their domain. Also leads to maintenance overhead for us. But all domains approach might mean the extension may not load correctly, place the button correctly, or even process the video correctly. 
2. How can the web extension determine if the video on the page is skippable?
   a. All domains: 
      i. We can break the early parts of the sound/video up into frames and have them be processed by some sort of ML algo. The algo will try to find common repeating images in the video or sounds and then we use that suggestion. 
         Cons: if we process every sound/video, it might be expensive. It might also be legally questionable to process that data.
   b. Per domain:
      i. We can find some sort of pattern to tell us which show is being processed. For example, if we restrict to 9anime then you easily know where the show name and episode number are so you can process and store the result based on that information. We can ignore domains like cnn.com because videos on there wouldn't be eligible at all. We have far more control and it'll be more reliable.
         Cons: Lots of domain specific code might slow us down and it becomes a maintenance nightmare.
3. How can the "Skip" button be placed on the video if we run it on multiple domains? Is there a generic way to place it on the page?
   a. Some domains have the `<video></video>` element so we should be able to determine the height and width of this element and then use CSS to overlay the control. Some domains might have an `<iframe></iframe>` and we're not sure if that will present challenges; probably can be ignored for MVP.
       Cons: Some videos have different control elements at the bottom. So we'd want to have the skip button avoid those areas. We could place it in the middle of the video towards the right edge. If a user goes picture-in-picture (PIP) (on mac and windows?), then we won't be able to run our extension; we can't support PIP.
4. What should happen if there are multiple videos on the page?
   a. We should not support this use case. Rarely does a TV show have all episodes on one page so the extension should not run. 
5. What if we cannot automatically determine the where to skip the video to?
   a. One approach is to collect the data from the users and have them supply the data (start and end timestamps). We could overlay the video with buttons the users can click once the intro has started (start then end; 2 buttons). Collect the timestamps and store them in a db by tv show metadata.
    Cons: Can be inaccurate. And we'll have to estimate the timestamp range based on most common submissions. Users will submit inaccurate timestamps. Worst case you have start timestamps that are too early - causing the skip button to appear early - or you have timestamps that end too late - causing the users to miss content.
6. What if a show changes intros mid season? For example some animes do that. Or what if the intro itself varies, like the simpsons?
   a. If we process every video then this shouldn't be an issue after the first episode has aired. So for the first episode of a series or where the intro has changed, Skiptro will not show, and then subsequent episodes and on the first episode it will.
   b. Processing for a Simpsons like scenario should not be considered for MVP but we could refine the algo to consider sound+video frames.
7. How do we determine which show is running based on the video?
   a. Are there any existing APIs that will tell me based on the video what the intro timestamps are?
8. What are the competitors to this product, if any? What do they offer in terms of features? What is their pricing structure?
9. What makes the product unique? Can it be easily recreated? 