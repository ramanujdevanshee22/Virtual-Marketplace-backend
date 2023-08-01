exports.res_creator = (transferObj, isErr, msg) => {
  return {
    obj: transferObj,
    isErr: isErr,
    msg: msg,
  };
};
