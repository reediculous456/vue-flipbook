import toastr from 'toastr';

const toastrOptions = {
  debug: false,
  extendedTimeOut: 1000,
  hideDuration: 300,
  hideEasing: `linear`,
  hideMethod: `fadeOut`,
  newestOnTop: false,
  onclick: null,
  positionClass: `toast-top-right`,
  preventDuplicates: true,
  progressBar: true,
  showDuration: 300,
  showEasing: `swing`,
  showMethod: `fadeIn`,
  timeOut: 5000,
};

toastr.options = toastrOptions;

export default toastr;
