

import { useContext } from "react"
import Context from "../Context"

const HistoryView = () => {
  const { history, onHistoryLineClick, historyDispatch,open, setOpen } = useContext(Context)

  const HistoryList = () => <ul id="search_history">
    {history.map((line, index) =>
      <li key={index} line={line}
      >
        <button className='del_line' onClick={() => historyDispatch({ type: 'del', payload: { key: line.key } })}>del</button>
        <span className='line_data' onClick={() => onHistoryLineClick(line.data)}>
          <button className='author_line_history' onClick={() => onHistoryLineClick(line.data)}>{line.data.author}</button>
          {!line.data.project ||<button className='project_line_history' onClick={() => onHistoryLineClick(line.data)}>{line.data.project}</button>}
        </span>
      </li>

    )}
  </ul>


  return <section id='view' className={open ? "hidden" : ""}>
    <HistoryList />
    <button id='history' onClick={() => setOpen(!open)}>
      {open ? "close" : "history"}
    </button>
  </section>
}



export default HistoryView