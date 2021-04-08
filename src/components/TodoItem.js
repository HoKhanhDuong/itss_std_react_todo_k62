/* 
  【TodoItemコンポーネント】
　・Todoアイテムを表示する
　・チェックボックスにチェックが入っているか管理する
　・チェックボックスにチェックが入っているかアイテムをグレーアウトする
*/
import React from 'react';

function TodoItem( {item} ) {
  const [state, setState] = React.useState(false);
  
  const onClickBox = () => {
    setState(!state);
  }

  return (
    <label className= {state ? "panel-block has-text-grey-light"
                               : "panel-block"}  >
      <input type="checkbox" onClick={() => onClickBox()}/>
        {item.text}
    </label>
  );
}

export default TodoItem;