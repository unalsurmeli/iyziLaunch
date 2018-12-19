const ImageUtil = {
  organizeImageURL: (rocket) => {
    if (!rocket.imageSizes.length > 0) {
      return 'https://s3.amazonaws.com/launchlibrary/RocketImages/placeholder_320.png';
    }

    let imageURL = rocket.imageURL;
    const minImageSize = rocket.imageSizes[0];
    const maxImageSize = rocket.imageSizes[rocket.imageSizes.length - 1];
    imageURL = imageURL.replace(maxImageSize, minImageSize);
    return imageURL;
  }
};

export default ImageUtil;
