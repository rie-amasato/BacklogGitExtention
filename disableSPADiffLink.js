/** 拡張機能を読み込むためにdiffへのリンクについてSPAを無効化します */
const disableSPADiffLink = () => {
  const elms_linkToDiff = Array.from(
    document.getElementsByClassName("tab--default__link")
  ).filter((elm) => {
    return elm.innerText === "ファイル";
  });

  elms_linkToDiff.forEach((elm) => {
    const locationPath = `${window.location.origin}${window.location.pathname}`;
    const elmlink = /\/(history)|(diff)$/.test(locationPath)
      ? `${locationPath.replace(/(history)|(diff)$/, "")}diff`
      : `${locationPath}/diff`;
    const cloneElm = elm.cloneNode(true);

    cloneElm.href = elmlink;
    elm.replaceWith(cloneElm);
  });
};

disableSPADiffLink();
