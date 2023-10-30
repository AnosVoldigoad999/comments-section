{replies.map((reply, index)=>{
    const [replyScore, setreplyScore] = useState(reply.score)
    const [isreplyingReply, setisReplyIngReply] = useState(false)
    const [replyContent, setReplyContent] = useState(reply.content)

    /*editfunc*/
    function handleUpdate(index){
      const newEdit = replies[index]
      newEdit.content=replyContent
      replies.splice(index, 1)
      replies.splice(index, 0, newEdit)
      setIsEditing(false)
    }


    
    /*editfunc*/

    return <div className="replycover">
      <div className={currentUser.username === reply.user.username?"replyuser":"reply"} key={index}>
  <div className="counter">
        <img onClick={()=>{setreplyScore(replyScore + 1)}} src="/images/icon-plus.svg" alt="plus" />
        <b>{replyScore}</b>
        <img onClick={()=>{replyScore>0 && setreplyScore(replyScore - 1)}} src="/images/icon-minus.svg" alt="minus" />
      </div>
  <div className="content">
  <div className="header">
    <div className={reply.user.username === currentUser.username? 'userProf' : 'prof'}>
    <img src={reply.user.image.png} alt="userimage" />
    <span><b>{reply.user.username}</b></span>
    {reply.user.username === currentUser.username && <span style={{backgroundColor:"hsl(238, 40%, 52%)", padding:'2px 7px',  color:'white'}}>you</span>}
    <span style={{color:'hsl(211, 10%, 45%)'}}>{reply.createdAt}</span>
    </div>
    {
      currentUser.username === reply.user.username? <div className="editdiv">
        <div className="deleteicon">
      <img src="/images/icon-delete.svg" alt="deleteicon" />
      <span><b style={{color:'hsl(358, 79%, 66%)'}}>Delete</b></span>
    </div >
        <div onClick={()=>{setIsEditing(!isEditing)}} className="replyicon">
        <img src="/images/icon-edit.svg" alt="editicon" />
      <span><b>Edit</b></span>
    </div>
      </div>:
      <div onClick={()=>{setisReplyIngReply(!isreplyingReply)}} className="replyicon">
      <img src="/images/icon-reply.svg" alt="replyicon" />
      <span><b>Reply</b></span>
    </div>
    }
  </div>
  <div className="des">
  <p>{isEditing===true && currentUser.username === reply.user.username? <div className="editArea">
  <textarea  placeholder='Add a comment...' id="commentArea" value={replyContent} onChange={(e)=>{setReplyContent(e.target.value)}} />
  <button onClick={()=>{handleUpdate(index)}}>UPDATE</button>
</div>:<><b style={{color:"hsl(238, 40%, 52%)"}}>@{reply.replyingTo}</b>{reply.content}</>}  </p>
  </div>
  </div>
  <br />
    </div>
    {
isreplyingReply &&  <div className="replyAreaForReply">
<img src={currentUser.image.png} alt="userimage" />
<textarea name="commentArea" placeholder='Reply comment...' id="commentArea" />
<button>Reply</button>
</div>
}
<br />
    </div>
   })}







       /*const [replyScore, setreplyScore] = useState(reply.score)
    const [isreplyingReply, setisReplyIngReply] = useState(false)
    const [replyContent, setReplyContent] = useState(reply.content)*/

    /*editfunc*/
    /*function handleUpdate(index){
      const newEdit = replies[index]
      newEdit.content=replyContent
      replies.splice(index, 1)
      replies.splice(index, 0, newEdit)
      setIsEditing(false)
    }*/


    
    /*editfunc*/