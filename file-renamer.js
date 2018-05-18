var fs = require('fs');
var child_process = require('child_process');

var setting = require('./setting.json');

const myEditor = setting.editor;
const default_target = setting.default_target;
const beforeTxt = './tmp/before.txt';
const afterTxt = './tmp/after.txt';
const targetDirTxt = './tmp/targetDir.txt';

var exec = (() => {

	// 対象ディレクトリ入力テキストを作成
	fs.writeFileSync(targetDirTxt, '修正したいディレクトリを2行目に記載してください。入力後はエディタを終了してください。\n');
	fs.appendFileSync(targetDirTxt, default_target);

	// 対象のディレクトリを入力させる(終了を待つ)
	child_process.execSync(myEditor + ' ' + targetDirTxt, { stdio: 'inherit' });

	// target directory の読み込み
	var targetStr = fs.readFileSync(targetDirTxt, 'utf-8');
	var targetSplit = targetStr.split('\n');
	const targetDir = targetSplit[1];
	console.log(targetSplit[1]);

	// create 修正前ファイル
	fs.writeFileSync(beforeTxt, '変更後のファイル名を入力してください。入力後はエディタを終了してください。絶対にソートしないでください。\n');

	// target directory内のファイル一覧取得
	var files = fs.readdirSync(targetDir);

	// ファイル一覧をbefore.txtに出力
	files.forEach(f => {
		fs.appendFileSync(beforeTxt, f + '\n');
	});

	// 修正後ファイルの作成
	fs.copyFileSync(beforeTxt, afterTxt);

	// 編集後のファイル名を入力させる(終了を待つ)
	child_process.execSync(myEditor + ' ' + afterTxt, { stdio: 'inherit' });

	// beforeリストの読み込み
	var beforeStr = fs.readFileSync(beforeTxt, 'utf-8');
	var beforeSplit = beforeStr.split('\n');

	// afterリストの読み込み
	var afterStr = fs.readFileSync(afterTxt, 'utf-8');
	var afterSplit = afterStr.split('\n');

	// リネーム実行
	beforeSplit.forEach((bf, i) => {
		var af = afterSplit[i];
		if (bf != af) {
			fs.renameSync(targetDir + '/' + bf, targetDir + '/' + af);
			console.log('リネームしました(' + bf + ' => ' + af + ')');
		}
	});

	// 修正したのでafterをbeforeに上書き
	fs.copyFileSync(afterTxt, beforeTxt);

	console.log('処理が終了しました');
})();
