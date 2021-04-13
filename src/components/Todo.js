import React, { useState } from 'react';

// @import url('https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.2/css/bulma.min.css');

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import {getKey} from "../lib/util";

function Todo() {
  const [items, putItems] = React.useState([
      /* テストコード 開始 */
    { key: getKey(), text: '日本語の宿題', done: false },
    { key: getKey(), text: 'reactを勉強する', done: false },
    { key: getKey(), text: '明日の準備をする', done: false },
    /* テストコード 終了 */
  ]);

  const [tab,setTab] = useState("すべて");
  const itemTab = () => {
      const tabItem = items.filter((item) => {
          if (tab === "すべて")
              return item;
          if (tab === "未完了" && !item.done) {
              return item;
          }
          if (tab === "完了済み" && item.done) {
              return item;
          }
      });
      return tabItem;
  };
  const handleChangeTab = (target) =>{
      setTab(target);
  };

  const onchange = (e) => {
    if(e.key === 'Enter'){
      const newItem =  {
        key: getKey(),
        text: e.target.value,
        done: false
      };
      items.push(newItem);
      putItems([...items]);
    }
  }

  const onClickBox = (key) => {
    items.map(item => {
      if(item.key === key) {
        item.done = !item.done;
      }
    });
    putItems([...items]);
  }

  const todo = items.map(item => (
    <TodoItem 
         key={item.key}
         item={item}
         onClickBox={onClickBox}
    />
  ));

  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <input type="text" className="input" onKeyDown={(e) => onchange(e)}></input>
      <br/>
      
      {todo}
      <div className="panel-block">
      <Filter onClick={handleChangeTab}/>
        {items.length} items
        {itemTab().length} items
      </div>
    </div>
  );
}

export default Todo;