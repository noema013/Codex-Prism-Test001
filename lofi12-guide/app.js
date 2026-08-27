const ASSET = "./assets/manual/";

const guides = [
  {
    id: "realtime-recording",
    category: "シーケンサー",
    title: "鍵盤演奏をリアルタイムで録音する",
    summary: "パターンを流しながら、弾いたタイミングをそのまま記録します。",
    keywords: ["リアルタイム", "シーケンサーに打ち込み", "弾きながら録音", "演奏を録音", "録音したい", "レコーディング", "鍵盤を録音"],
    duration: "約3分",
    level: "はじめて向け",
    pages: "57–58、70",
    image: "realtime-recording.png",
    before: ["音を出したいトラック（TRACK 1〜4）を1つ選びます。", "BANKノブとSAMPLEノブで使いたい音を選び、鍵盤で試し弾きします。"],
    markers: [
      { n: 1, label: "● REC", x: 75, y: 45, step: 0 },
      { n: 2, label: "▶ PLAY", x: 69, y: 45, step: 1 },
      { n: 3, label: "鍵盤", x: 52, y: 82, step: 2 }
    ],
    steps: [
      { title: "録音ボタンを押す", text: "右側にある「●」ボタンを1回押します。赤く点灯したら録音の準備完了です。", controls: ["● REC"] },
      { title: "再生を始める", text: "「▶」ボタンを押します。パターンが繰り返し再生され、同時に録音が始まります。", controls: ["▶ PLAY"], tip: "入りやすくしたいときは、FUNC＋METROでメトロノーム音量、FUNC＋PRE COUNTで開始前のカウントを設定できます。" },
      { title: "入れたい場所で鍵盤を弾く", text: "音を入れたいタイミングで下側の鍵盤キーを弾きます。失敗しても、もう一周するので落ち着いて追加できます。", controls: ["鍵盤キー"] },
      { title: "録音を終えて保存する", text: "もう一度「●」で録音を終え、「▶」で停止します。最後にFUNCを押しながらSAVEを押し、OKを押します。画面にDONEと出たら保存完了です。", controls: ["● REC", "▶ PLAY", "FUNC + SAVE", "OK"], tip: "保存しないで電源を切ると、いま作った内容は消えます。" }
    ],
    warning: "録音中に同じ音を重ねると追加記録されます。消したいステップは、録音を止めてからCLRを押しながら該当ステップを押します。"
  },
  {
    id: "edit-sample",
    category: "サンプル",
    title: "取り込んだサンプルを編集する",
    summary: "音の始まり・終わり、音程、音量を整えます。",
    keywords: ["サンプルを編集", "取り込んだサンプル", "録音した音を編集", "音の頭を切る", "音の終わりを切る", "トリミング", "ピッチ変更", "サンプルの音量"],
    duration: "約5分",
    level: "ゆっくり操作",
    pages: "40、43–45",
    image: "sample-edit-controls.png",
    before: ["付属の「SAMPLE & EDIT」オーバーレイシートがあれば、本体に載せると名前が見やすくなります。", "残したい音を確認できるよう、ヘッドホンか本体スピーカーを使います。"],
    markers: [
      { n: 1, label: "START / END", x: 45, y: 22, step: 2 },
      { n: 2, label: "PITCH / LEVEL", x: 66, y: 22, step: 2 },
      { n: 3, label: "VALUE", x: 79, y: 39, step: 3 },
      { n: 4, label: "SAVE / OK", x: 62, y: 50, step: 4 }
    ],
    steps: [
      { title: "SAMPLE & EDITを開く", text: "FUNCを押しながら、鍵盤のいちばん左にあるSAMPLEを押します。サンプルの一覧（スロット選択）に入ります。", controls: ["FUNC + SAMPLE"] },
      { title: "編集するサンプルを選ぶ", text: "VALUEノブを回して目的のサンプルを選びます。鍵盤を弾くと音を確認できます。選べたらOKを押して編集画面に入ります。", controls: ["VALUE", "鍵盤キー", "OK"] },
      { title: "いらない前後を短くする", text: "STARTノブで音の始まり、ENDノブで音の終わりを調整します。少しずつ回し、鍵盤で何度も確認します。", controls: ["START", "END"], tip: "最初はSTARTだけを少しずつ動かすと簡単です。音の出だしが欠けたら、少し戻してください。" },
      { title: "必要なら音程と音量を整える", text: "PITCHで音の高さ、LEVELで音量を調整します。細かく合わせたいときは、調整したい値を表示したままVALUEノブを回します。", controls: ["PITCH", "LEVEL", "VALUE"] },
      { title: "編集内容を保存する", text: "SAVE/OKボタンを2回押します。画面にSAVEと表示され、サンプル一覧に戻れば完了です。", controls: ["SAVE / OK ×2"], tip: "やめたいときはCANCEL/CLRを押すと、変更を保存せず一覧に戻れます。" }
    ],
    warning: "STARTを進めすぎたりENDを戻しすぎたりすると、必要な音まで切れてしまいます。保存前に必ず鍵盤で試聴してください。"
  },
  {
    id: "quick-sampling",
    category: "サンプル",
    title: "外部の音をサンプリングする",
    summary: "スマホやプレーヤーの音をLINE INから録音します。",
    keywords: ["サンプリング", "音を取り込む", "音を取り込みたい", "外の音", "外部の音", "スマホの音を録音", "外部入力を録音", "line in", "ライン入力", "サンプル録音", "マイク録音"],
    duration: "約4分",
    level: "接続あり",
    pages: "32–34",
    image: "quick-sampling.png",
    before: ["録音したい機器の出力をLofi-12のLINE INへつなぎます。", "スマホからつなぐ場合は、スマホ側の音量をいったん半分ほどにします。"],
    markers: [
      { n: 1, label: "LINE IN", x: 88, y: 8, step: 0 },
      { n: 2, label: "FUNC", x: 13, y: 51, step: 1 },
      { n: 3, label: "SAMPLING", x: 68, y: 51, step: 1 },
      { n: 4, label: "OK", x: 59, y: 51, step: 4 }
    ],
    steps: [
      { title: "LINE INにつなぐ", text: "録音したい機器のヘッドホン／LINE出力を、Lofi-12上部のLINE INへ接続します。", controls: ["LINE IN"], tip: "マイクやギターは直接つなげません。ミキサーなどでライン信号に変えてから接続します。" },
      { title: "録音待機にする", text: "FUNCを押しながらSAMPLINGを押します。SAMPLINGが赤く点滅し、ステップLEDが入力音量のメーターになります。", controls: ["FUNC + SAMPLING"] },
      { title: "音量を確認する", text: "録音したい音を再生し、LEDが強く点きっぱなしにならない音量にします。小さすぎる場合はLINE INのGAINを調整します。", controls: ["ステップLED", "LINE IN GAIN"] },
      { title: "録音を開始する", text: "もう一度SAMPLINGを押します。音が入ると自動で録音が始まり、ステップ16まで進むと自動で止まります。", controls: ["SAMPLING"] },
      { title: "保存先を選んで保存する", text: "OKを押し、BANKとSAMPLEで保存先を選びます。鍵盤で中身を確認し、点滅しているOKを押して保存します。", controls: ["OK", "BANK", "SAMPLE", "OK"] }
    ],
    warning: "既に音が入っているスロットへ保存すると置き換わります。鍵盤で中身を確認してから保存してください。"
  },
  {
    id: "step-recording",
    category: "シーケンサー",
    title: "1音ずつステップ入力する",
    summary: "再生を止めたまま、位置を選んで確実に音を置きます。",
    keywords: ["ステップ入力", "一音ずつ打ち込み", "じっくり打ち込み", "ドラムを打ち込む", "ステップレコーディング", "音を置く"],
    duration: "約5分",
    level: "はじめて向け",
    pages: "51–56、70",
    image: "step-recording.png",
    before: ["「▶」が消灯し、再生が止まっていることを確認します。", "TRACK 1〜4を選び、BANKとSAMPLEで使いたい音を選びます。"],
    markers: [
      { n: 1, label: "● REC", x: 83, y: 48, step: 0 },
      { n: 2, label: "STEP 1–16", x: 37, y: 58, step: 1 },
      { n: 3, label: "鍵盤", x: 46, y: 84, step: 2 }
    ],
    steps: [
      { title: "ステップ録音を始める", text: "停止中に「●」を押します。赤く点灯したらステップ入力モードです。", controls: ["● REC"] },
      { title: "音を置く場所を選ぶ", text: "丸いステップキー1〜16から、音を鳴らしたい位置を1つ押します。選んだ位置のLEDが点滅します。", controls: ["STEP 1–16"] },
      { title: "入れたい音程を押す", text: "下側の鍵盤キーを押すと、そのステップに音が入ります。同じ鍵盤をもう一度押すと、その音だけ外れます。", controls: ["鍵盤キー"] },
      { title: "位置と音を繰り返す", text: "手順2と3を繰り返します。途中で▶を押せば、できたところまで聴けます。", controls: ["STEP", "鍵盤キー", "▶ PLAY"] },
      { title: "終了して保存する", text: "「●」を押してステップ入力を終了します。FUNC＋SAVE、続けてOKを押し、DONEと表示されたら完了です。", controls: ["● REC", "FUNC + SAVE", "OK"] }
    ],
    warning: "ステップを消すときはCLRを押しながら消したいステップキーを押します。録音中はそのステップの音だけが消えます。"
  },
  {
    id: "direct-recording",
    category: "シーケンサー",
    title: "再生しながら直接ステップを足す",
    summary: "曲を聴きながら、狙った位置へ音を追加します。",
    keywords: ["ダイレクト入力", "再生しながらステップ", "直接打ち込み", "再生中に音を追加", "ライブで打ち込み"],
    duration: "約2分",
    level: "慣れてきたら",
    pages: "59、70",
    image: "direct-recording.png",
    before: ["TRACK 1〜4を選び、BANKとSAMPLEで使いたい音を選びます。", "再生中でも停止中でも使えます。"],
    markers: [
      { n: 1, label: "STEP", x: 36, y: 57, step: 0 },
      { n: 2, label: "鍵盤", x: 49, y: 83, step: 1 }
    ],
    steps: [
      { title: "鳴らしたい位置を押したままにする", text: "ステップキー1〜16のうち、音を置きたい位置を押したままにします。", controls: ["STEP 1–16"] },
      { title: "鍵盤で音を選ぶ", text: "ステップを押したまま、入れたい音程の鍵盤を押します。順番は逆でも大丈夫です。", controls: ["鍵盤キー"] },
      { title: "保存する", text: "FUNC＋SAVEを押してからOKを押します。DONEと表示されたら保存完了です。", controls: ["FUNC + SAVE", "OK"] }
    ],
    warning: "同じ位置へ繰り返し入力すると音が重なることがあります。不要な位置はCLR＋ステップキーで消せます。"
  },
  {
    id: "choose-sound",
    category: "基本",
    title: "トラックと音を選ぶ",
    summary: "まず音を鳴らすための、いちばん基本の準備です。",
    keywords: ["音を選ぶ", "音を選びたい", "サンプルを選ぶ", "トラックを選ぶ", "音色変更", "音色を変えたい", "別の音", "bank", "sample"],
    duration: "約2分",
    level: "最初に読む",
    pages: "16、21",
    image: "device-overview.png",
    before: ["本体の電源とスピーカーをONにします。", "全体の音量は右端のVOLノブで小さめから調整します。"],
    markers: [
      { n: 1, label: "TRACK 1–4", x: 38, y: 47, step: 0 },
      { n: 2, label: "BANK", x: 42, y: 25, step: 1 },
      { n: 3, label: "SAMPLE", x: 54, y: 25, step: 1 },
      { n: 4, label: "鍵盤", x: 51, y: 83, step: 2 }
    ],
    steps: [
      { title: "使うトラックを選ぶ", text: "TRACK 1〜4のどれかを押します。選ばれたトラックが赤く点灯します。最初はTRACK 1で大丈夫です。", controls: ["TRACK 1–4"] },
      { title: "音の置き場所を選ぶ", text: "BANKノブで音のグループ、SAMPLEノブでその中の音を選びます。", controls: ["BANK", "SAMPLE"] },
      { title: "鍵盤で音を確認する", text: "下側の鍵盤キーを弾いて音を確認します。気に入らなければBANKとSAMPLEをもう一度回します。", controls: ["鍵盤キー"] }
    ]
  },
  {
    id: "play-pattern",
    category: "基本",
    title: "保存されたパターンを再生する",
    summary: "内蔵パターンを選んで、まず音を鳴らしてみます。",
    keywords: ["再生", "曲を聞く", "パターンを再生", "デモを聴く", "音が出ない", "play"],
    duration: "約1分",
    level: "最初に読む",
    pages: "13",
    image: "device-overview.png",
    before: ["右端のVOLノブを小さめにします。", "ヘッドホンを使わない場合は、内蔵スピーカーがONか確認します。"],
    markers: [
      { n: 1, label: "PTN", x: 88, y: 48, step: 0 },
      { n: 2, label: "STEP 1–16", x: 45, y: 58, step: 1 },
      { n: 3, label: "▶ PLAY", x: 76, y: 48, step: 2 }
    ],
    steps: [
      { title: "パターン選択を開く", text: "PTNボタンを押します。", controls: ["PTN"] },
      { title: "パターンを選ぶ", text: "ステップキー1〜16から聴きたい番号を押します。最初は1で大丈夫です。", controls: ["STEP 1–16"] },
      { title: "再生する", text: "「▶」を押します。もう一度押すと停止します。", controls: ["▶ PLAY"] }
    ]
  },
  {
    id: "change-tempo",
    category: "基本",
    title: "曲の速さ（テンポ）を変える",
    summary: "BPMノブを使って、曲を速く／遅くします。",
    keywords: ["テンポ", "速さ", "bpm", "曲を速く", "曲を遅く", "スピード変更"],
    duration: "約1分",
    level: "かんたん",
    pages: "14、72–73",
    image: "device-overview.png",
    before: ["パターンを再生しておくと、変化を耳で確認しやすくなります。"],
    markers: [{ n: 1, label: "BPM", x: 85, y: 35, step: 0 }],
    steps: [
      { title: "BPMノブを回す", text: "本体右側のBPMノブを、右へ回すと速く、左へ回すと遅くなります。画面の数字が1分間の拍数です。", controls: ["BPM"] },
      { title: "細かく合わせる", text: "画面にBPMが出ている間にVALUEノブを回すと、0.1ずつ細かく調整できます。", controls: ["VALUE"] }
    ]
  },
  {
    id: "effects",
    category: "音づくり",
    title: "音にエフェクトをかける",
    summary: "ディレイや歪みなどで、選んだトラックの音を変えます。",
    keywords: ["エフェクト", "fx", "音を加工", "ディレイ", "歪ませる", "コーラス", "ローファイにする", "crush"],
    duration: "約3分",
    level: "音づくり",
    pages: "30–31",
    image: "device-overview.png",
    before: ["エフェクトをかけたいTRACK 1〜4を選びます。", "音を再生しながら操作すると違いが分かりやすくなります。"],
    markers: [
      { n: 1, label: "FUNC + FX", x: 77, y: 58, step: 0 },
      { n: 2, label: "VALUE", x: 70, y: 24, step: 1 },
      { n: 3, label: "SPEED / AMOUNT", x: 65, y: 25, step: 2 }
    ],
    steps: [
      { title: "エフェクト選択を開く", text: "FUNCを押しながらFXキーを押します。", controls: ["FUNC + FX"] },
      { title: "種類を選ぶ", text: "VALUEノブを回し、まずはDLY（ディレイ）やCRSH（クラッシュ）を選びます。", controls: ["VALUE"] },
      { title: "かかり具合を調整する", text: "SPEED/FXノブとAMOUNTノブを少しずつ回します。AMOUNTを上げるほど効果が強くなります。", controls: ["SPEED / FX", "AMOUNT"] }
    ],
    warning: "音が大きくなりすぎることがあります。最初はAMOUNTを少なめにし、VOLも控えめにしてください。"
  },
  {
    id: "save-pattern",
    category: "基本",
    title: "作ったパターンを保存する",
    summary: "電源を切る前に、演奏情報と音色を保存します。",
    keywords: ["保存", "セーブ", "作った曲を残す", "消えないように", "save", "done"],
    duration: "約1分",
    level: "大切",
    pages: "70",
    image: "device-overview.png",
    before: ["保存すると、現在選んでいるパターンの以前の内容は置き換わります。"],
    markers: [
      { n: 1, label: "FUNC", x: 10, y: 48, step: 0 },
      { n: 2, label: "SAVE", x: 8, y: 58, step: 0 },
      { n: 3, label: "OK", x: 70, y: 48, step: 1 }
    ],
    steps: [
      { title: "保存操作を開く", text: "FUNCを押しながらSAVEキーを押します。", controls: ["FUNC + SAVE"] },
      { title: "OKで確定する", text: "OKを押します。画面にDONEと表示されたら保存完了です。", controls: ["OK"], tip: "別の場所へ保存する場合は、FUNC＋SAVEの後にページキーでバンク、ステップ1〜16で保存先を選びます。" }
    ],
    warning: "作業中のデータは、保存せずに電源を切ると消えます。区切りごとに保存するのがおすすめです。"
  },
  {
    id: "clear-step",
    category: "困ったとき",
    title: "間違えて入れた音を消す",
    summary: "1か所だけ、またはトラック全体の音を消します。",
    keywords: ["間違えた", "音を消す", "ステップを削除", "やり直し", "クリア", "clr", "undo", "取り消し"],
    duration: "約2分",
    level: "困ったとき",
    pages: "68",
    image: "device-overview.png",
    before: ["1音だけ消すのか、トラック全部を消すのかを先に決めます。"],
    markers: [
      { n: 1, label: "CLR", x: 65, y: 48, step: 0 },
      { n: 2, label: "STEP 1–16", x: 43, y: 58, step: 0 },
      { n: 3, label: "TRACK 1–4", x: 38, y: 48, step: 1 }
    ],
    steps: [
      { title: "1か所だけ消す", text: "CLRを押しながら、消したいステップキー1〜16を押します。その位置の音と動きの情報が消えます。", controls: ["CLR + STEP"] },
      { title: "トラック内の音を全部消す", text: "CLRを押しながら消したいTRACK 1〜4を押し、VALUEでNOTEを選んでOKを押します。", controls: ["CLR + TRACK", "VALUE → NOTE", "OK"], tip: "この操作はトラック内の全ステップが対象です。実行前にトラック番号を確認してください。" },
      { title: "必要なら保存する", text: "消した状態を残す場合は、FUNC＋SAVEの後にOKを押します。", controls: ["FUNC + SAVE", "OK"] }
    ],
    warning: "NOTEの全消去は元に戻しにくい操作です。トラック番号を必ず確認してください。"
  },
  {
    id: "chop-sample",
    category: "サンプル",
    title: "長いサンプルを鍵盤ごとに分ける",
    summary: "Downbeat Dividerで、サンプルを同じ長さに分割します。",
    keywords: ["チョップ", "スライス", "サンプルを分割", "鍵盤に分ける", "downbeat divider", "ドラムキット"],
    duration: "約6分",
    level: "慣れてきたら",
    pages: "37–38",
    image: "device-overview.png",
    before: ["分割したいサンプルを選びます。", "まず空のパターンを選び、誤って作成中の内容を変えないようにします。"],
    markers: [
      { n: 1, label: "VOICE → DRUM", x: 83, y: 35, step: 0 },
      { n: 2, label: "DIVIDER", x: 31, y: 35, step: 1 },
      { n: 3, label: "左端の鍵盤", x: 8, y: 84, step: 2 }
    ],
    steps: [
      { title: "ボイスモードをDRUMにする", text: "FUNCを押しながらVOICEを押し、VALUEでDRUMを選びます。", controls: ["FUNC + VOICE", "VALUE → DRUM"] },
      { title: "Downbeat Dividerを表示する", text: "FUNCを押しながらDownbeat Dividerのキーを押します。画面に分割の基準値が出ます。", controls: ["FUNC + Downbeat Divider"] },
      { title: "1拍の長さを合わせる", text: "いちばん左の鍵盤（F）を押しながらVALUEを回します。最初の2〜3鍵盤を順に試し、切れ目が自然な値を探します。", controls: ["左端の鍵盤 + VALUE"] },
      { title: "鍵盤で分割結果を確認する", text: "左から順に鍵盤を弾くと、分割された別々の部分が鳴ります。", controls: ["鍵盤キー"] }
    ],
    warning: "自動分割は同じ長さで切ります。元の音のタイミングが不揃いだと、自然な位置にならないことがあります。"
  }
];

const glossary = [
  ["サンプル", "録音してLofi-12の中に取り込んだ音です。声、ドラム、楽器など、短い音の素材を指します。"],
  ["トラック", "音色と演奏情報をまとめるレーンです。Lofi-12には4つあり、ドラム、ベースなどを分けて作れます。"],
  ["パターン", "4つのトラックをまとめた短い演奏のまとまりです。曲の部品のようなものです。"],
  ["シーケンサー", "どのタイミングでどの音を鳴らすかを記録し、自動演奏する仕組みです。"],
  ["ステップ", "時間をマス目のように区切った1コマです。Lofi-12では丸いキー1〜16で位置を選びます。"],
  ["BPM／テンポ", "曲の速さです。数字が大きいほど速く、小さいほどゆっくりになります。"],
  ["BANK", "音やパターンをまとめて入れておく大きな引き出しです。"],
  ["スロット", "1つのサンプルを保存する場所です。既に音が入った場所へ保存すると、その音と置き換わります。"],
  ["LINE IN", "スマホやプレーヤーなど、外部機器の音をLofi-12へ入れる端子です。"],
  ["ピッチ", "音の高さです。上げると高く、下げると低くなります。"],
  ["エフェクト", "元の音に、反響、歪み、揺れなどの変化を加える機能です。"],
  ["メトロノーム", "一定の間隔で鳴るカチカチ音です。演奏のタイミングを合わせる助けになります。"],
  ["プリカウント", "録音が始まる前に鳴る数え音です。心の準備をしてから弾き始められます。"],
  ["パラメーターロック", "ノブの値をステップごとに記録して、再生中に音を自動変化させる機能です。"]
];

const app = document.querySelector("#app");
const toast = document.querySelector("#toast");
const networkBadge = document.querySelector("#networkBadge");
const installButton = document.querySelector("#installButton");
let activeCategory = "すべて";
let deferredInstallPrompt = null;
let toastTimer = null;

const icons = {
  mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4m-3 0h6"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 14 0m-5-5 5 5-5 5"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>'
};

function esc(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function getRecent() {
  try { return JSON.parse(localStorage.getItem("lofi12-recent") || "[]"); } catch { return []; }
}

function addRecent(id) {
  const next = [id, ...getRecent().filter(item => item !== id)].slice(0, 4);
  localStorage.setItem("lofi12-recent", JSON.stringify(next));
}

function normalize(value) {
  return value.toLowerCase().normalize("NFKC").replace(/[\s　・／/()（）\-ー]/g, "");
}

function searchGuides(query) {
  const q = normalize(query);
  if (!q) return guides;
  return guides.map(guide => {
    const fields = [guide.title, guide.summary, guide.category, ...guide.keywords].map(normalize);
    let score = 0;
    fields.forEach((field, index) => {
      if (field === q) score += index < 2 ? 30 : 22;
      else if (field.includes(q)) score += index < 2 ? 18 : 13;
      else if (q.includes(field) && field.length > 2) score += index < 2 ? 14 : 10;
    });
    const fragments = query.split(/[\s　、。をがにでとしたい]+/).map(normalize).filter(part => part.length > 1);
    fragments.forEach(part => fields.forEach(field => { if (field.includes(part)) score += 2; }));
    return { guide, score };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score).map(item => item.guide);
}

function guideRow(guide) {
  return `<button class="guide-row" type="button" data-guide="${guide.id}">
    <img src="${ASSET}${guide.image}" alt="" loading="lazy" />
    <span class="guide-row-copy"><small>${guide.category}</small><strong>${guide.title}</strong><span>${guide.summary}</span></span>
    <span class="chevron" aria-hidden="true">›</span>
  </button>`;
}

function askBox(value = "") {
  return `<form class="ask-box" data-search-form>
    <input type="search" name="question" value="${esc(value)}" aria-label="やりたいことを入力" placeholder="例：サンプルを編集したい" autocomplete="off" enterkeyhint="search" />
    <span class="ask-actions">
      <button class="mic-button" type="button" data-voice aria-label="音声で質問する">${icons.mic}</button>
      <button class="submit-button" type="submit" aria-label="検索する">${icons.arrow}</button>
    </span>
  </form>`;
}

function homeView() {
  const recent = getRecent().map(id => guides.find(guide => guide.id === id)).filter(Boolean);
  const quick = ["realtime-recording", "edit-sample", "quick-sampling", "step-recording"].map(id => guides.find(guide => guide.id === id));
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">WHAT DO YOU WANT TO MAKE?</p>
      <h1>今日は、何を<br>してみたいですか？</h1>
      <p class="lead">むずかしい言葉は不要です。「音を録りたい」のように、そのまま話すか入力してください。</p>
      ${askBox()}
      <p class="voice-hint"><span></span>マイクを押して、日本語で話せます</p>
    </section>
    <section class="section">
      <div class="section-head"><div><p class="section-kicker">QUICK START</p><h2>よく使う操作</h2></div><button type="button" data-route="guides">すべて見る</button></div>
      <div class="quick-grid">
        ${quick.map((guide, index) => `<button class="quick-card" type="button" data-guide="${guide.id}"><span class="quick-icon">${["●", "✂", "↙", "16"][index]}</span><strong>${guide.title}</strong><small>${guide.duration} ・ ${guide.level}</small></button>`).join("")}
      </div>
    </section>
    ${recent.length ? `<section class="section"><div class="section-head"><div><p class="section-kicker">CONTINUE</p><h2>最近見たガイド</h2></div></div>${recent.slice(0,1).map(guide => `<button class="continue-card" type="button" data-guide="${guide.id}"><span class="continue-thumb"><img src="${ASSET}${guide.image}" alt=""></span><span class="continue-copy"><small>続きから確認</small><strong>${guide.title}</strong><span>${guide.summary}</span></span><span class="chevron">›</span></button>`).join("")}</section>` : ""}
    <section class="section"><div class="tip-card"><span>💡</span><div><strong>はじめて使う方へ</strong><p>迷ったら「トラックと音を選ぶ」から始めると、操作の流れがつかめます。</p></div></div></section>`;
  setActiveNav("home");
}

function guidesView(query = "") {
  const categories = ["すべて", ...new Set(guides.map(guide => guide.category))];
  let results = searchGuides(query);
  if (activeCategory !== "すべて") results = results.filter(guide => guide.category === activeCategory);
  app.innerHTML = `
    <header class="page-head"><p class="section-kicker">GUIDES</p><h1>${query ? `「${esc(query)}」のガイド` : "操作ガイド"}</h1><p>${query ? `${results.length}件の近い操作を見つけました。` : "やりたいことに近い項目を選んでください。"}</p></header>
    ${askBox(query)}
    <div class="filter-row" aria-label="カテゴリー" style="margin-top:18px">${categories.map(category => `<button class="filter-chip ${category === activeCategory ? "is-active" : ""}" type="button" data-category="${category}">${category}</button>`).join("")}</div>
    ${results.length ? `<p class="search-result-note">${query ? "いちばん近い順に表示しています。" : `${results.length}件のガイド`}</p><div class="guide-list">${results.map(guideRow).join("")}</div>` : `<div class="empty-state"><span>🔎</span><h2>ぴったりのガイドがありません</h2><p>「録音」「音を消す」など、短い言葉でもう一度お試しください。</p><button type="button" data-route="guides">ガイド一覧を見る</button></div>`}`;
  setActiveNav("guides");
}

function guideView(id) {
  const guide = guides.find(item => item.id === id);
  if (!guide) return guidesView();
  addRecent(id);
  const completed = getCompleted(id);
  app.innerHTML = `
    <section class="guide-hero">
      <button class="back-button" type="button" data-route="guides">${icons.back}ガイド一覧</button>
      <p class="section-kicker">${guide.category}</p>
      <h1>${guide.title}</h1>
      <p>${guide.summary}</p>
      <div class="meta-row"><span class="meta-pill">⏱ ${guide.duration}</span><span class="meta-pill">○ ${guide.level}</span><span class="meta-pill">全${guide.steps.length}ステップ</span></div>
    </section>
    <div class="guide-body">
      <section class="before-card"><h2><span>✓</span> はじめる前に</h2><ul>${guide.before.map(item => `<li>${item}</li>`).join("")}</ul></section>
      <figure class="device-card">
        <div class="device-card-head"><strong>この場所を使います</strong><span>番号をタップできます</span></div>
        <div class="device-stage">
          <img src="${ASSET}${guide.image}" alt="LIVEN Lofi-12の操作パネル" />
          ${guide.markers.map(marker => `<button class="device-marker" type="button" style="left:${marker.x}%;top:${marker.y}%" data-step-jump="${marker.step}" aria-label="手順${marker.step + 1} ${marker.label}"><span class="marker-dot">${marker.n}</span><span class="marker-label">${marker.label}</span></button>`).join("")}
        </div>
        <figcaption class="device-legend">色の丸は、これから触るボタンやノブの位置です。</figcaption>
      </figure>
      <h2 class="steps-title">操作手順</h2>
      <div class="step-list">
        ${guide.steps.map((step, index) => `<article class="step-card ${completed.includes(index) ? "is-done" : ""}" id="step-${index}">
          <button class="step-check" type="button" data-step-check="${index}" aria-label="手順${index + 1}を完了にする"><span class="step-number">${index + 1}</span></button>
          <div class="step-copy"><h3>${step.title}</h3><p>${step.text}</p>${step.controls?.length ? `<div class="control-row">${step.controls.map(control => `<span class="control-key">${control}</span>`).join("")}</div>` : ""}${step.tip ? `<div class="step-tip"><span>💡</span><span>${step.tip}</span></div>` : ""}</div>
        </article>`).join("")}
      </div>
      ${guide.warning ? `<aside class="warning-card"><span>⚠</span><div><strong>ここに注意</strong>${guide.warning}</div></aside>` : ""}
      <section class="success-card"><span>◎</span><h2>ここまでできたら完了！</h2><p>チェックはこの端末に保存されます。あとから続きを確認できます。</p><button type="button" data-reset-guide="${guide.id}">チェックを最初に戻す</button></section>
      <p class="source-note">公式「LIVEN Lofi-12 User's Manual Rev.3」${guide.pages}ページに基づく案内です。</p>
    </div>`;
  setActiveNav("guides");
}

function glossaryView(filter = "") {
  app.innerHTML = `
    <header class="page-head"><p class="section-kicker">GLOSSARY</p><h1>ことばの説明</h1><p>音楽制作の言葉を、できるだけ普通の言葉で説明します。</p></header>
    <label class="glossary-search">${icons.search}<input id="glossaryInput" type="search" value="${esc(filter)}" placeholder="ことばを検索" aria-label="用語を検索"></label>
    <div class="glossary-list" id="glossaryResults">${glossaryItems(filter)}</div>`;
  setActiveNav("glossary");
}

function glossaryItems(filter = "") {
  const q = normalize(filter);
  const items = glossary.filter(([term, desc]) => !q || normalize(term + desc).includes(q));
  return items.map(([term, desc]) => `<details class="glossary-item"><summary>${term}</summary><p>${desc}</p></details>`).join("") || `<div class="empty-state"><p>見つかりませんでした。</p></div>`;
}

function settingsView() {
  const largeText = document.body.classList.contains("large-text");
  app.innerHTML = `
    <header class="page-head"><p class="section-kicker">SETTINGS</p><h1>設定</h1><p>見やすさとアプリの保存状態を変更できます。</p></header>
    <div class="settings-list">
      <section class="settings-card"><h2>文字の大きさ</h2><p>カバー画面で読みやすい大きさを選びます。</p><div class="font-controls"><button class="${!largeText ? "is-active" : ""}" type="button" data-font-size="normal">標準</button><button class="${largeText ? "is-active" : ""}" type="button" data-font-size="large">大きめ</button></div></section>
      <section class="settings-card"><h2>ホーム画面に追加</h2><p>追加すると、通常のアプリのように全画面で開けます。オフラインでもガイドを確認できます。</p><button type="button" data-install>この端末に追加する</button></section>
      <section class="settings-card"><h2>音声入力について</h2><p>音声はAndroidの音声認識機能で文字に変換されます。認識した内容は、このアプリ内のガイド検索にだけ使います。端末の音声認識設定によっては通信が必要です。</p></section>
      <section class="settings-card"><h2>進み具合をリセット</h2><p>ガイドにつけたチェックと最近見た項目を消します。マニュアル本体は消えません。</p><button class="secondary" type="button" data-reset-all>履歴とチェックを消す</button></section>
      <section class="settings-card"><h2>このアプリについて</h2><p>LIVEN Lofi-12 User's Manual Rev.3（ファームウェア v2.1対応）の内容を、初心者向けに言い換えて収録しています。</p></section>
    </div>`;
  setActiveNav("settings");
}

function getCompleted(id) {
  try { return JSON.parse(localStorage.getItem(`lofi12-completed-${id}`) || "[]"); } catch { return []; }
}

function saveCompleted(id, list) {
  localStorage.setItem(`lofi12-completed-${id}`, JSON.stringify(list));
}

function currentRoute() {
  return location.hash.replace(/^#\/?/, "") || "home";
}

function navigate(route) {
  const target = route === "home" ? "#home" : `#${route}`;
  if (location.hash === target) renderRoute(); else location.hash = target;
}

function renderRoute() {
  const route = currentRoute();
  const [path, search = ""] = route.split("?");
  const [section, id] = path.split("/");
  if (section === "guide") guideView(id);
  else if (section === "guides") {
    const query = new URLSearchParams(search).get("q") || "";
    guidesView(query);
  } else if (section === "glossary") glossaryView();
  else if (section === "settings") settingsView();
  else homeView();
  window.scrollTo({ top: 0, behavior: "instant" });
  requestAnimationFrame(() => app.focus({ preventScroll: true }));
}

function setActiveNav(route) {
  document.querySelectorAll("[data-nav]").forEach(button => {
    if (button.dataset.nav === route) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
}

function startVoice(button) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("このブラウザでは音声入力を使えません。文字で入力してください。");
    button.closest("form")?.querySelector("input")?.focus();
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = "ja-JP";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  const input = button.closest("form").querySelector("input");
  recognition.onstart = () => { button.classList.add("is-listening"); input.placeholder = "聞いています…"; };
  recognition.onresult = event => {
    const transcript = Array.from(event.results).map(result => result[0].transcript).join("");
    input.value = transcript;
    if (event.results[event.results.length - 1].isFinal) setTimeout(() => submitQuestion(transcript), 250);
  };
  recognition.onerror = event => {
    const messages = { "not-allowed": "マイクの使用が許可されていません。", "no-speech": "声を聞き取れませんでした。もう一度お試しください。", network: "音声認識に接続できませんでした。" };
    showToast(messages[event.error] || "音声入力を完了できませんでした。");
  };
  recognition.onend = () => { button.classList.remove("is-listening"); input.placeholder = "例：サンプルを編集したい"; };
  try { recognition.start(); } catch { showToast("少し待ってから、もう一度マイクを押してください。"); }
}

function submitQuestion(query) {
  const value = query.trim();
  if (!value) return showToast("やりたいことを入力してください。");
  const results = searchGuides(value);
  if (results.length === 1 || (results[0] && results[0].keywords.some(keyword => normalize(value).includes(normalize(keyword))))) {
    navigate(`guide/${results[0].id}`);
  } else {
    navigate(`guides?q=${encodeURIComponent(value)}`);
  }
}

document.addEventListener("click", event => {
  const route = event.target.closest("[data-route]");
  if (route) { navigate(route.dataset.route); return; }
  const guide = event.target.closest("[data-guide]");
  if (guide) { navigate(`guide/${guide.dataset.guide}`); return; }
  const voice = event.target.closest("[data-voice]");
  if (voice) { startVoice(voice); return; }
  const category = event.target.closest("[data-category]");
  if (category) { activeCategory = category.dataset.category; const query = new URLSearchParams(currentRoute().split("?")[1] || "").get("q") || ""; guidesView(query); return; }
  const jump = event.target.closest("[data-step-jump]");
  if (jump) {
    const target = document.querySelector(`#step-${jump.dataset.stepJump}`);
    if (target) { target.scrollIntoView({ behavior: "smooth", block: "center" }); target.classList.add("is-focused"); setTimeout(() => target.classList.remove("is-focused"), 1600); }
    return;
  }
  const check = event.target.closest("[data-step-check]");
  if (check) {
    const id = currentRoute().split("/")[1];
    const index = Number(check.dataset.stepCheck);
    const completed = getCompleted(id);
    const next = completed.includes(index) ? completed.filter(item => item !== index) : [...completed, index];
    saveCompleted(id, next);
    check.closest(".step-card").classList.toggle("is-done", next.includes(index));
    if (next.length === guides.find(item => item.id === id)?.steps.length) showToast("すべての手順が完了しました！");
    return;
  }
  const resetGuide = event.target.closest("[data-reset-guide]");
  if (resetGuide) { saveCompleted(resetGuide.dataset.resetGuide, []); guideView(resetGuide.dataset.resetGuide); showToast("チェックを最初に戻しました。"); return; }
  const fontSize = event.target.closest("[data-font-size]");
  if (fontSize) {
    const large = fontSize.dataset.fontSize === "large";
    document.body.classList.toggle("large-text", large);
    localStorage.setItem("lofi12-large-text", large ? "1" : "0");
    settingsView();
    return;
  }
  if (event.target.closest("[data-reset-all]")) {
    Object.keys(localStorage).filter(key => key.startsWith("lofi12-completed-") || key === "lofi12-recent").forEach(key => localStorage.removeItem(key));
    showToast("履歴とチェックを消しました。");
    return;
  }
  if (event.target.closest("[data-install]") || event.target.closest("#installButton")) installApp();
});

document.addEventListener("submit", event => {
  const form = event.target.closest("[data-search-form]");
  if (!form) return;
  event.preventDefault();
  submitQuestion(new FormData(form).get("question") || "");
});

document.addEventListener("input", event => {
  if (event.target.id === "glossaryInput") document.querySelector("#glossaryResults").innerHTML = glossaryItems(event.target.value);
});

function installApp() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.finally(() => { deferredInstallPrompt = null; installButton.classList.add("is-hidden"); });
  } else {
    showToast("Chromeのメニューから「ホーム画面に追加」を選んでください。");
  }
}

function updateNetworkState() {
  const offline = !navigator.onLine;
  networkBadge.classList.toggle("is-offline", offline);
  networkBadge.lastChild.textContent = offline ? " オフライン中" : " オフラインOK";
}

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.classList.remove("is-hidden");
});
window.addEventListener("online", updateNetworkState);
window.addEventListener("offline", updateNetworkState);
window.addEventListener("hashchange", renderRoute);

if (localStorage.getItem("lofi12-large-text") === "1") document.body.classList.add("large-text");
updateNetworkState();
renderRoute();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
