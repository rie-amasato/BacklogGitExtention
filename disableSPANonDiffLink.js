/** 拡張機能を解除するためにdiffからそれ以外へのリンクについてSPAを無効化します */
const disableSPANonDiffLink = () => {
  const elms_linkToNonDiff = Array.from(
    document.getElementsByClassName("tab--default__link")
  ).filter((elm) => {
    return elm.innerText !== "ファイル";
  });

  elms_linkToNonDiff.forEach((elm) => {
    const locationPath = `${window.location.origin}${window.location.pathname}`;
    const elmlink =
      elm.innerText === "コメント"
        ? `${locationPath.replace(/\/diff$/, "")}`
        : `${locationPath.replace(/diff$/, "")}history`;

    const cloneElm = elm.cloneNode(true);
    cloneElm.href = elmlink;
    elm.replaceWith(cloneElm);
  });
};

disableSPANonDiffLink();
