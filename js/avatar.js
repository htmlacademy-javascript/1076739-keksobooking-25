const fileChooserAvatar = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

const fileChooserPhoto = document.querySelector('#images');
const previewPhoto = document.querySelector('.ad-form__photo img');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


const onPreloadPhoto = (fileChooser, preview) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

onPreloadPhoto(fileChooserAvatar, previewAvatar);

onPreloadPhoto(fileChooserPhoto, previewPhoto);

