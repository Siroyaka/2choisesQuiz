// 問題集計する形式
export interface IQuestionResult<TIn, TRe> {
  answeredCount: number,
  appendChoiseValue: (choiseValue: TIn) => void // IQuestionのT型のオブジェクトを受け取るResultを貯蔵していく
  readResult: () => TRe // appendChoiseValueで積み重ねた値から結果を出力する
}

// 問題自体の形式
export interface IQuestion<T> {
  id: string, // 固有ID
  choiseLength: number, // 選択肢の数
  getQuestion: () => string, // クイズの内容を読み取る
  getChoises: () => string[], // 選択肢の内容を読み取る
  getChoisesValue: (index: number) => T // 選んだ選択肢の影響値 = resultに保存される値
  getFailureValue: () => T // 答えることに失敗した場合(制限時間切れなどで)の影響値
}

// 問題を作成する関数の形式
export type Quiz<TChoiseValue, TQuestionSource> = (obj: TQuestionSource) => IQuestion<TChoiseValue>;

// 問題を出力するフォームに必要とされる基本の型
export interface IQuestionFormProps<TChoiseValue, TQuestionSource, TResult> {
  title: string, // タイトル
  onFinished: (result: TResult) => void, // クイズが終了したときに実行される関数
  quiz: Quiz<TChoiseValue, TQuestionSource>, // クイズを作成する関数
  timeLimit?: number, // 1問あたりの制限時間
  captionSpeed?: number, // 問題の文字送りの速さ
  questionInterval?: number, // 問題を答えた後にどのくらいインターバルをあけるか
  countdownSpeed?: number, // カウントダウンのインターバルの長さ
  startCountdown?: number, // 初めにいくつカウントダウンするか
  buttonSize?: 'small' | 'middle' | 'large',
}

// 問題を管理するReducerの基本型
export interface IQuestionReducerState<T1, T2> {
  isAnswered: boolean, // 答えた直後の状態であることを示す
  isSetQuiz: boolean, // クイズをStateに追加した直後の状態であることを示す
  isInitialize: boolean, // 初期状態であることを示す
  quizResult: IQuestionResult<T1, T2>, // 問題に答えた結果
  quizInfo: IQuestion<T1>[], // 問題について
}

export interface IQuestionResultFormProps {
  title: string,
  hashTags: string[],
  notShare?: boolean
}
