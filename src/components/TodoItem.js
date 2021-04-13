/* 
  【TodoItemコンポーネント】
　・Todoアイテムを表示する
　・チェックボックスにチェックが入っているか管理する
　・チェックボックスにチェックが入っているかアイテムをグレーアウトする
*/
import React from 'react';

function TodoItem( {item , onClickBox} ) {
  const [state, setState] = React.useState(false);
  
  const onclick = (key) => {
    setState(!state);
    onClickBox(key);
  }

  return (
    <label className= {state ? "panel-block has-text-grey-light"
                               : "panel-block"}  >
      <input type="checkbox" onClick={() => onclick(item.key)}/>
        {item.text}
    </label>
  );
}

export default TodoItem;