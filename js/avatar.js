const fileChooserAvatar = document.querySelector('#avatar');
const previewAvatarContainer = document.querySelector('.ad-form-header__preview');
const fileChooserPhoto = document.querySelector('#images');
const previewPhotoContainer = document.querySelector('.ad-form__photo');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const preloadPhoto = (fileChooser, previewContainer) => {
  fileChooser.addEventListener('change', () => {
    const lastNewImage = previewContainer.querySelector('img.user__image');
    if (lastNewImage) {
      lastNewImage.remove();
    }
    const defautImage = previewContainer.querySelector('img');
    if (defautImage) {
      defautImage.style.display = 'none';
    }
    const newImage = document.createElement('img');
    newImage.width = 40;
    newImage.height = 40;
    newImage.classList.add('user__image');
    previewContainer.appendChild(newImage);
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      newImage.src = URL.createObjectURL(file);
    }
  });
};

const clearPreview = (...rest) => {
  const containers = rest;
  containers.forEach((container) => {
    const preview = container.querySelector('img.user__image');
    const defautImage = container.querySelector('img');
    if (preview) {
      preview.remove();
      defautImage.style.display = 'block';
    }
  });
};

preloadPhoto(fileChooserAvatar, previewAvatarContainer);

preloadPhoto(fileChooserPhoto, previewPhotoContainer);

export { clearPreview, previewAvatarContainer, previewPhotoContainer };
