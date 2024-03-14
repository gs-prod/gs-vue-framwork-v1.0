export const resetForm = (form: Object) => {
  for (const key in form) {
    // @ts-ignore
    form[key] = "";
  }
};
