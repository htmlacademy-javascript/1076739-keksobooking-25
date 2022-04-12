

export const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError();
      }
    })
    .then((objects) => {
      onSuccess(objects);
      return (objects);
    })
    .catch(() => {
      onError();
    });
};

export const setData = (url, form, onSuccess, onError) => {
  fetch(url,
    {
      method: 'POST',
      body: form,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};
