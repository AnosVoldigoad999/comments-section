import { useState, useEffect } from 'react'
import './App.css'
import DATA from './data.json'

/*Goodluck,  to whoever's reading my code :), or is it whomever???*/

export default function App(){
  const [currentUser, setCurrentUser] = useState(DATA.currentUser)
  const [comments, setComments] = useState(()=>{
    const gottenComments = JSON.parse(localStorage.getItem('comments'))
    if(!gottenComments){
      return DATA.comments
    } else{
      return gottenComments
    }
  })
  const [userComment, setUserComment] = useState('')
  const [Reply, setReply] = useState('')
  const [edit, setEdit] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState('')
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [replyToDelete, setreplyToDelete] = useState('')



useEffect(()=>{

  const newOne  = comments.map(comment=>{
    const reply = comment.replies
    return {...comment, isEditing:false, isReplying:false , replies:reply.map(rep=>{
      return {...rep, isEditing:false, isReplying:false}
    })}
  })
 
 
  setComments(newOne)
  comments.sort((a, b)=>{
    return b.score - a.score
  })





 }, [])




  


useEffect(()=>{

 localStorage.setItem('comments', JSON.stringify(comments))

 }, [comments])



  function handleComment(){
    if(userComment){
      const today = new Date()
      const dd = today.getDate()
      const mm = today.getMonth() + 1
      const yy = today.getFullYear() % 100
      const hr = today.getHours()
      const mi = today.getMinutes()

      const createdAt = `${dd<10?`0${dd}`:dd}/${mm<10?`0${mm}`:mm}/${yy} @${hr<10 ?`0${hr}`:hr}:${mi<10 ?`0${mi}`:mi}`

      
      setComments([...comments, {
        "id": comments.length+1,
        "content": userComment,
        "createdAt": createdAt ,
        "score": 0,
        "user": {
          "image": { 
            "png": currentUser.image.png,
            "webp": currentUser.image.webp
          },
          "username": currentUser.username
        },
        "replies": []
      }])
      setUserComment('')
    }
  }

  function handleAdd(id){
    const newOne = comments.map(comment=>{
      const score = comment.score
      if(id===comment.id){
        return {...comment, score : score+1}
      } else{
        return comment
      }
    })

    newOne.sort((a, b)=>{
      return b.score - a.score
    })

    setComments(newOne)


   


   
  }

  function handleSub(id){
    const newOne = comments.map(comment=>{
      const score = comment.score
      if(id===comment.id && comment.score>0){
        return {...comment, score : score-1}
      } else{
        return comment
      }
    })

    newOne.sort((a, b)=>{
      return b.score - a.score
    })

    setComments(newOne)
  }


  /*replies*/
  function handleAddReply(comment, id){
    const ID = comment.id
   const Reply = comment.replies
   let newOne = comments.map(comment=>{
    if(comment.id === ID){
      return {...comment, replies: Reply.map(rep=>{
        const score = rep.score
        if(rep.id===id){
          return {...rep, score: score+1}
        } else{
          return rep
        }
      })}
    } else{
      return comment
    }
   })

   newOne = newOne.map(one=>{
    const Reply = one.replies
    return {...one, replies: Reply.sort((a, b)=>{
      return b.score - a.score
    })}
   })

    setComments(newOne)
  }

  function handleSubReply(comment, id){
    const ID = comment.id
    const Reply = comment.replies
    let newOne = comments.map(comment=>{
     if(comment.id === ID){
       return {...comment, replies: Reply.map(rep=>{
         const score = rep.score
         if(rep.id===id && rep.score > 0){
           return {...rep, score: score - 1}
         } else{
           return rep
         }
       })}
     } else{
       return comment
     }
    })


    newOne = newOne.map(one=>{
      const Reply = one.replies
      return {...one, replies: Reply.sort((a, b)=>{
        return b.score - a.score
      })}
     })


    setComments(newOne)
  }


  function handleReply(comment){
    if(Reply){
      const today = new Date()
      const dd = today.getDate()
      const mm = today.getMonth() + 1
      const yy = today.getFullYear() % 100
      const hr = today.getHours()
      const mi = today.getMinutes()

      const ID = comment.id
      const reply = comment.replies
      const username = comment.user.username
      const createdAt = `${dd<10?`0${dd}`:dd}/${mm<10?`0${mm}`:mm}/${yy} @${hr<10 ?`0${hr}`:hr}:${mi<10 ?`0${mi}`:mi}`
      let newOne = comments.map(comment=>{
        if(comment.id === ID){
          return {...comment, isReplying:false, replies:[...reply, {
            "id": reply.length+1,
            "content": Reply,
            "createdAt": createdAt,
            "score": 0,
            "replyingTo": username,
            "user": {
              "image": { 
                "png": currentUser.image.png,
                "webp": currentUser.image.webp
              },
              "username": currentUser.username 
            }
          }]}
        } else{
          return comment
        }
      })
  
  setComments(newOne)
  setReply('')
    }
  }



  function handleReplyReply(id, comment, index){
    if(Reply){
      const reply = comment.replies
      const ID  = comment.id
      const username = comment.user.username
  
      const today = new Date()
        const dd = today.getDate()
        const mm = today.getMonth() + 1
        const yy = today.getFullYear() % 100
        const hr = today.getHours()
        const mi = today.getMinutes()
  
        const createdAt = `${dd<10?`0${dd}`:dd}/${mm<10?`0${mm}`:mm}/${yy} @${hr<10 ?`0${hr}`:hr}:${mi<10 ?`0${mi}`:mi}`
  
  
      let newOne = comments.map(comment=>{
        if(comment.id === ID){
          return {...comment, replies:[...reply,{
            "id": reply.length+1,
            "content": Reply,
            "createdAt": createdAt,
            "score": 0,
            "replyingTo": username,
            "user": {
              "image": { 
                "png": currentUser.image.png,
                "webp": currentUser.image.webp
              },
              "username": currentUser.username
            }
          } ]}
        } else{
          return comment
        }
      })
  
      newOne = newOne.map(comment=>{
        if(comment.id === ID){
          const reply = comment.replies
          return {...comment, replies: reply.map(rep=>{
            if(rep.id===id){
              return{...rep, isReplying:false}
            } else{
              return rep
            }
          })}
        } else{
          return comment
        }
      })
  
  
  
      setComments(newOne)
      setReply('')
    }
  }


  function handleDelete(item){


    const newOne = comments.filter(comment=>{
      return comment != item
    })

    setComments(newOne)



    setShowModal(false)
  }


  function handleDeleteReply(comment, reply){
    const ID = comment.id
    const Reply = comment.replies
   

    const newOne = comments.map(comment=>{
      if(comment.id===ID){
        return {...comment, replies: Reply.filter(rep=>{
          return rep != reply
        })}
      } else{
        return comment
      }
    })

    setComments(newOne)

    setShowReplyModal(false)
  }


  function handleReplyEdit (reply, comment){
    const content = reply.content
    const Reply = comment.replies
    const ID = comment.id
    const id = reply.id
    const newOne = comments.map(comment=>{
      if(comment.id === ID){
        return {...comment, replies:Reply.map(rep=>{
          if(rep.id === id){
            return {...rep, isEditing: true}
          } else{
            return rep
          }
        })}
      } else{
        return comment
      }
    })
    setEdit(content)
    setComments(newOne)
  }
 
  function handleReplyUpdate(comment, id){
    const ID = comment.id
    const reply = comment.replies
    const newOne = comments.map(comment=>{
      if(comment.id===ID){
        return {...comment, replies: reply.map(rep=>{
          if(rep.id === id){
            return {...rep, content: edit, isEditing: false}
          } else {
            return rep
          }
        })}
      } else{
        return comment
      }
    })
    setComments(newOne)
    setEdit('')
   console.log(newOne)
  }

  function handleEdit(comment){
    const content = comment.content
    const ID = comment.id
    setEdit(content)
    const newOne = comments.map(comment=>{
      if(comment.id === ID){
        return {...comment, isEditing:true}
      } else{
        return comment
      }
    })
    setComments(newOne)
  }

  function handleUpdate(comment){
    const ID = comment.id
    const newOne = comments.map(comment=>{
      if(comment.id === ID){
        return {...comment, content:edit, isEditing:false}
      } else{
        return comment
      }
    })

    setComments(newOne)

  }
  

  function handleModal(comment){
    setShowModal(true)
    setItemToDelete(comment)
  }

  function handleReplyModal(comment, reply){
    setShowReplyModal(true)
    setItemToDelete(comment)
    setreplyToDelete(reply)
  }

 

  return<>
  <div className="container">
  <input type='checkbox' checked={showModal} />
  <div className="modal">
     <div className="warning">
      <h3>Delete comment</h3>
     <p>
        Are you sure you want to delete this comment? This will remove the comment and can't be undone.
      </p>
      <div className="buttons">
        <button  style={{backgroundColor:"hsl(211, 10%, 45%)"}} onClick={()=>{setShowModal(false)}}>NO, CANCEL</button>
        <button style={{backgroundColor:"hsl(358, 79%, 66%)"}} onClick={()=>{handleDelete(itemToDelete)}}>YES, DELETE</button>
      </div>
     </div>
    </div>


   <div>
   <input type='checkbox' checked={showReplyModal} />
            <div className="modal">
     <div className="warning">
      <h3>Delete comment</h3>
     <p>
        Are you sure you want to delete this comment? This will remove the comment and can't be undone.
      </p>
      <div className="buttons">
        <button style={{backgroundColor:"hsl(211, 10%, 45%)"}} onClick={()=>{setShowReplyModal(false)}}>NO, CANCEL</button>
        <button style={{backgroundColor:"hsl(358, 79%, 66%)"}} onClick={()=>{handleDeleteReply(itemToDelete, replyToDelete)}}>YES, DELETE</button>
      </div>
     </div>
    </div>
   </div>



    <div className="comments">
      {comments.map((comment, index)=>{
        return <div className='commentContainer'>
           
            
          <div className='commentcover'> 
        <div className="comment" key={index}>

          <div className="counterDiv">
          <div className="counter">
            <img onClick={()=>{handleAdd(comment.id)}} src="/images/icon-plus.svg" alt="plus" />
            <b>{comment.score}</b>
            <img onClick={()=>{handleSub(comment.id)}}  src="/images/icon-minus.svg" alt="minus" />
          </div>

          {
      currentUser.username === comment.user.username? <div className="editdiv">
        <div className="deleteicon" onClick={()=>{handleModal(comment)}}>
      <img src="/images/icon-delete.svg" alt="deleteicon" />
      <span><b style={{color:'hsl(358, 79%, 66%)'}}>Delete</b></span>
    </div >
   <label htmlFor={comment.id}>
   <div onClick={()=>{handleEdit(comment)}} className="replyicon">
        <img src="/images/icon-edit.svg" alt="editicon" />
      <span><b>Edit</b></span>
    </div>
   </label>
      </div>:
       <label htmlFor={comment.user.username} onClick={()=>{setComments(comments.map(comm=>{
        if(comm.id===comment.id){
          const is = comm.isReplying
          return {...comm, isReplying: !is}
        }else{
          return comm
        }
       }))}}> 
      <div className="replyicon">
      <img src="/images/icon-reply.svg" alt="replyicon" />
      <span><b>Reply</b></span>
    </div>
    </label>
    }

          </div>


          <div className="content">
          <div className="header">
            <div className={comment.user.username === currentUser.username?"userProf":"prof"}>
           <div className="user">
           <img src={comment.user.image.png} alt="userimage" />
            <span><b>{comment.user.username}</b></span>
            {comment.user.username === currentUser.username && <span className='you' style={{backgroundColor:"hsl(238, 40%, 52%)", padding:'2px 7px',  color:'white', fontSize:"0.8em"}}>you</span>}
           </div>
            <span className='createdAt' style={{color:'hsl(211, 10%, 45%)'}}>{comment.createdAt}</span>
            </div>
        {
      currentUser.username === comment.user.username? <div className="editdiv">
        <div className="deleteicon" onClick={()=>{ handleModal(comment)  }}>
      <img src="/images/icon-delete.svg" alt="deleteicon" />
      <span><b style={{color:'hsl(358, 79%, 66%)'}}>Delete</b></span>
    </div >
   <label htmlFor={comment.id}>
   <div onClick={()=>{handleEdit(comment)}} className="replyicon">
        <img src="/images/icon-edit.svg" alt="editicon" />
      <span><b>Edit</b></span>
    </div>
   </label>
      </div>:
       <label htmlFor={comment.user.username} onClick={()=>{setComments(comments.map(comm=>{
        if(comm.id===comment.id){
          const is = comm.isReplying
          return {...comm, isReplying: !is}
        }else{
          return comm
        }
       }))}}> 
      <div className="replyicon">
      <img src="/images/icon-reply.svg" alt="replyicon" />
      <span><b>Reply</b></span>
    </div>
    </label>
    }
          </div>
          <div className="des">
            <input type='checkbox' id={comment.id} checked={comment.isEditing} />
          <p className='replyP'>{comment.content}</p>
          <div className="editArea">
          <textarea  placeholder='Add a comment...' id="commentArea" value={edit} onChange={(e)=>{setEdit(e.target.value)}} />
          <button onClick={()=>{handleUpdate(comment)}}>UPDATE</button>
</div>
          </div>
          </div>
          <br />
    </div>
   <input type='checkbox' id={comment.user.username} checked={comment.isReplying} />
   <div className="replyArea">
    <img src={currentUser.image.png} alt="userimage" />
    <textarea value={Reply} onChange={e=>{setReply(e.target.value)}} name="commentArea" placeholder='Reply comment...' id="commentArea" />
    <button onClick={()=>{handleReply(comment)}}>Reply</button>
  </div>
    <br/>
        </div>



        {/*replies*/}
        <div className="replies">
        {comment.replies.map((reply, index)=>{


    return <div className="replycover">
         
      <div className={currentUser.username === reply.user.username?"replyuser":"reply"} key={index}>
 <div className="counterDiv">
 <div className="counter">
        <img onClick={()=>{handleAddReply(comment, reply.id)}} src="/images/icon-plus.svg" alt="plus" />
        <b>{reply.score}</b>
        <img onClick={()=>{handleSubReply(comment, reply.id)}} src="/images/icon-minus.svg" alt="minus" />
      </div>

      {
      currentUser.username === reply.user.username? <div className="editdiv">
        <div className="deleteicon" onClick={()=>{handleReplyModal(comment, reply)}}>
      <img src="/images/icon-delete.svg" alt="deleteicon" />
      <span><b style={{color:'hsl(358, 79%, 66%)'}}>Delete</b></span>
    </div >
        <label htmlFor={reply.content}>
        <div onClick={()=>{handleReplyEdit(reply, comment)}} className="replyicon">
        <img src="/images/icon-edit.svg" alt="editicon" />
      <span><b>Edit</b></span>
    </div>
        </label>
      </div>:
      <label htmlFor={reply.user.username} onClick={()=>{
        setComments(comments.map(comm=>{
          if(comm.id === comment.id){
            const Reply = comm.replies
            return {...comm, replies: Reply.map(rep=>{
              if(rep.id === reply.id){
                const is = rep.isReplying
                return {...rep, isReplying: !is}
              } else{
                return rep
              }
            })}
          } else{
            return comm
          }
        }))
      }}>
      <div className="replyicon">
      <img src="/images/icon-reply.svg" alt="replyicon" />
      <span><b>Reply</b></span>
    </div></label>
    }


 </div>
  <div className="content">
  <div className="header">
    <div className={reply.user.username === currentUser.username? 'userProf' : 'prof'}>
      <div className="user">
      <img src={reply.user.image.png} alt="userimage" />
    <span><b>{reply.user.username}</b></span>
    {reply.user.username === currentUser.username && <span style={{backgroundColor:"hsl(238, 40%, 52%)", padding:'2px 7px',  color:'white', fontSize:'0.8em'}}>you</span>}
      </div>
    <span className='createdAt' style={{color:'hsl(211, 10%, 45%)'}}>{reply.createdAt}</span>
    </div>
    {
      currentUser.username === reply.user.username? <div className="editdiv">
        <div className="deleteicon" onClick={()=>{handleReplyModal(comment, reply)}}>
      <img src="/images/icon-delete.svg" alt="deleteicon" />
      <span className='delete'><b>Delete</b></span>
    </div >
        <label htmlFor={reply.content}>
        <div onClick={()=>{handleReplyEdit(reply, comment)}} className="replyicon">
        <img src="/images/icon-edit.svg" alt="editicon" />
      <span><b>Edit</b></span>
    </div>
        </label>
      </div>:
      <label htmlFor={reply.user.username} onClick={()=>{
        setComments(comments.map(comm=>{
          if(comm.id === comment.id){
            const Reply = comm.replies
            return {...comm, replies: Reply.map(rep=>{
              if(rep.id === reply.id){
                const is = rep.isReplying
                return {...rep, isReplying: !is}
              } else{
                return rep
              }
            })}
          } else{
            return comm
          }
        }))
      }}>
      <div className="replyicon">
      <img src="/images/icon-reply.svg" alt="replyicon" />
      <span><b>Reply</b></span>
    </div></label>
    }
  </div>
  <div className="des">
    <input type='checkbox'  id={reply.content} checked={reply.isEditing} />
  <p className='replyP'><><b style={{color:"hsl(238, 40%, 52%)"}}>@{reply.replyingTo}</b>&nbsp;{reply.content}</></p>
  <div className="editArea">
  <textarea  placeholder='Add a comment...' id="commentArea" value={edit} onChange={(e)=>{setEdit(e.target.value)}} />
  <button onClick={()=>{handleReplyUpdate(comment, reply.id)}}>UPDATE</button>
</div>
  </div>
  </div>
  <br />
    </div>
    <input type='checkbox' id={reply.user.username} checked={reply.isReplying} />
    <div className="replyAreaForReply">
<img src={currentUser.image.png} alt="userimage" />
<textarea value={Reply} onChange={(e)=>setReply(e.target.value)} name="commentArea" placeholder='Reply comment...' id="commentArea" />
<button onClick={()=>{handleReplyReply(reply.id, comment, index)}}>Reply</button>

</div>
<br />
    </div>
   })}
      </div>
      </div>
      })}
    </div>
  
  
    <div className="commentArea">
      <img src={currentUser.image.png} alt="userimage" />
      <textarea value={userComment} onChange={(e)=>{setUserComment(e.target.value)}} placeholder='Add a comment...' id="commentArea" />
      <button onClick={handleComment}>SEND</button>
    </div>
  </div>
  </>
}