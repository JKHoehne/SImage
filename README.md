# SurveyImage (SImage): A comprehensive guide for collecting images in surveys

This repository provides the source codes of the “SurveyImage (SImage)” tool developed by Jan Karem Höhne (University of Mannheim; RECSM-Universitat Pompeu Fabra), Danish Daniel Qureshi (University of Frankfurt), and Konstantin Gavras (University of Mannheim). SImage enables researchers to collect respondents’ answers to survey questions in the form of images. Images can be taken in the moment using the camera or simply uploaded from the gallery (it depends on the research purposes). SImage is based on different program languages, such as JavaScript and PHP, and licensed under the Apache 2.0 License (see [here](https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)#fulltext)). It can be implemented in browser-based survey software solutions. The collection of images is generally not restricted to specific operating systems and/or Internet browsers. After successful photograph or selection of an image a miniature version of the respective image will be displayed.

# Adapting SImage to your survey

In this repository, we provide a generic solution of SImage (see Figures below). When using SImage for your own purposes, you may include a logo and a survey question in the [Upload_Gallery.html](/SImage/Upload_Gallery.html) or [Upload_Camera.html](/SImage/Upload_Camera.html) files. Adaptations to the image uploading instruction (e.g., how to take and/or upload an image), need to be implemented in the [uploadForm_Gallery.js](/SImage/uploadForm_Gallery.js) or [uploadForm_Camera.js](/SImage/uploadForm_Camera.js) files.

<div class="row">
  <div class="column">
    <img src="/img/Image_SImage_Camera.jpg" "width:25%">
  </div>
  <div class="column">
    <img src="/img/Image_SImage_Gallery.jpg" "width:25%">
  </div>
</div>

# Implementing SImage in your survey

The implementation of SImage depends on the survey software solution used. In general, SImage is not hosted on the server of the respective survey software solution but on an external server (e.g., the server of your institution). This is also were respondents’ answers in the form of images are stored. Respondents must be redirected from the survey software solution to the respective server. It is necessary to add a unique and anonymous ID (e.g., a random number) in the link for each respondent. This ID must be saved in the form of a TIC variable in the survey software solution and in the file name of the images. This is crucial to match the survey data collected via the survey software solution and the images.

# SImage and ethical considerations

The use of program languages, such as JavaScript and PHP, enables researchers to collect sensitive data, such as respondents’ answers in the form of images. Researchers using such data face ethical considerations. Although we encourage researchers to use image data to improve survey research methods, we clearly state that these data should not be used to surveil respondents or to frivolously adapt responses given by respondents. We are convinced that these kinds of data should not be collected without respondents’ consent, even if willingness to participate in surveys decreases. Furthermore, we highly recommend checking (specific) legal prerequisites to protect the online privacy of respondents.

# SImage disclaimer

Although the authors tested the application of SImage, they wish to state clearly here that the use of all program codes is completely the user’s own responsibility. There is no warranty of any kind that the codes work properly and users are encouraged to test their functionality before utilization. The authors cannot be held responsible for any malfunctions and/or damages, even if SImage is the responsible source.

Citation: Höhne, J. K., Qureshi, D. D., & Gavras, K., (2020). SurveyImage (SImage): A comprehensive guide for collecting images in surveys. Zenodo. DOI: …
