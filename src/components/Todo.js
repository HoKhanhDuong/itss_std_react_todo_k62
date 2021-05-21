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
// import useStorage from '../hooks/storage';
import useStorageFirebase from "../hooks/firestore";

/* ライブラリ */
import {getKey} from "../lib/util";

function Todo() {
      const [items, addItem, updateItem, cleanItems] = useStorageFirebase();

    const handleCheckTodoItem = (item) => {
        updateItem(item);
    };
    const handleAdd = (text) => {
        const newItem = {key: getKey(), text: text, done: false};
        addItem(newItem);
    };
    const [tab, setTab] = useState("すべて");
    const itemTab = () => {
        return items.filter((item) => {
            if (tab === "すべて") {
                return item;
            }
            if (tab === "未完了" && !item.done) {
                return item;
            }
            if (tab === "完了済み" && item.done) {
                return item;
            }
        });
    };
    const handleChangeTab = (target) => {
        setTab(target);
    };
    const handleCleanItem = () => {
        cleanItems();
    };
    return (
        <div className="panel">
            <div className="panel-heading">
                ITSS ToDoアプリ
            </div>
            <Input onAdd={handleAdd}/>
            <Filter onClick={handleChangeTab}/>
            {itemTab().map(item => (
                <TodoItem item={item} key={item.key} onCheck={handleCheckTodoItem}/>
            ))}
            <div className="panel-block">
                {itemTab().length} items
            </div>
            <div className="panel-block">
                <button className="button is-light is-fullwidth" onClick={handleCleanItem}>全てのToDoを削除</button>
            </div>
      </div>
  );
}

export default Todo;