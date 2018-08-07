var imgupload = {};
imgupload.install = function (Vue, options) {
  Vue.prototype.$imgupload = (img, form, suc, err, other) => {

    var v = new Vue();
    let imgurl = v.$baseurl.imgupload;
    let formData = new FormData();
    let columnName = 'img';
    formData.append(columnName, img);
    let fileType = img.type;
    if (other) fileType = other;
    formData.append("fileType", fileType);
    if (form != undefined && form != null) {
      for (let i in form) {
        formData.append(i, form[i]);
      }
    }

    v.$Ajaxy('POST', imgurl, formData, suc, err, 'formdata')

  }
}

export default imgupload;
