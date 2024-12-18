/** コード中のDiffの+の数をカウントする条件
 * @param {str} line 判定する行の内容です
 * @returns {boolean} その行をカウントするか否かの判定結果
 */
const aggregationConditions = (line) => {
  // カウントする条件を示します。Conditionsが1つでもfalseだった場合はカウント対象外とします
  const conditions = [!!line.trim()];
  return conditions.every((v) => v);
};

/** コード中のDiffの+の数をカウントします */
const calcStepCount = () => {
  let elm_addLines = document.getElementsByClassName(
    "Code-table_content_added"
  );
  state_outputs.stepCount = 0;

  Array.from(elm_addLines).forEach((line) => {
    // 行数カウント条件がtrueの場合は行数を追加します
    const str_addedTextLineView = line.childNodes[5]?.outerText;
    const str_addedTextSplitView = line.childNodes[3]?.outerText;

    if (
      aggregationConditions(
        str_addedTextLineView || str_addedTextSplitView || ""
      )
    ) {
      state_outputs.stepCount += 1;
    }
  });

  // 分割表示と行表示を切り替えたときなど、数えたステップ数が減る場合は処理を行わない
  if (state_outputs.beforeStepCount <= state_outputs.stepCount) {
    displayStepCount();
    state_outputs.beforeStepCount = state_outputs.stepCount;
  }
};

/** カウントしたコードの+行数を表示します */
const displayStepCount = () => {
  const id_stepCountelm = "addedStepcount";

  const elm_added = document.getElementById(id_stepCountelm);
  const str_addedText = `ステップ数: ${state_outputs.stepCount}`;

  if (elm_added) {
    elm_added.innerHTML = str_addedText;
  } else {
    const elm_stepCount = document.createElement("dd");
    elm_stepCount.innerHTML = str_addedText;
    elm_stepCount.id = id_stepCountelm;
    elm_stepCount.className = "filter-nav__item";

    const elm_mavigator = document.getElementsByClassName(
      "code-view-mode-buttons-wrap filter-nav"
    )[0];

    if (elm_mavigator) {
      elm_mavigator.appendChild(elm_stepCount);
    }
  }
};

/** コードのDiff表示が追加されるたびにイベントを発火させる設定を行います */
const observing = () => {
  const elm_codeDiff = document.querySelectorAll(
    "div[data-bind='foreach: changeset']"
  )[0];

  const config = { attributes: false, childList: true, subtree: true };
  const observer = new MutationObserver(() => {
    calcStepCount();
  });
  if (elm_codeDiff) observer.observe(elm_codeDiff, config);

  return observer;
};

//** 画面初期表示時、イベント発火用の設定を行います */
const state_outputs = { stepCount: 0, beforeStepCount: 1 };
observing();
