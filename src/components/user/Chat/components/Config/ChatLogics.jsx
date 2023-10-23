export const isLastMessage = (messages, i, userId) => {
    console.log(messages);
    const lastSenderId =
      messages[messages.length - 1].sender.doctor &&
      messages[messages.length - 1].sender.doctor._id
        ? messages[messages.length - 1].sender.doctor._id
        : messages[messages.length - 1].sender.user._id;
  
    return i === messages.length - 1 && lastSenderId !== userId && lastSenderId;
  };

  export const isSameSenderMargin = (messages, m, i, userId) => {
    const currentSenderId =
      (m.sender.doctor && m.sender.doctor._id) || // Check sender.doctor
      (m.sender.user && m.sender.user._id); // Check sender.user
  
    if (
      i < messages.length - 1 &&
      (messages[i + 1].sender.doctor &&
        messages[i + 1].sender.doctor._id === currentSenderId ||
        (messages[i + 1].sender.user &&
          messages[i + 1].sender.user._id === currentSenderId)) &&
      currentSenderId !== userId
    ) {
      return 33;
    } else if (
      (i < messages.length - 1 &&
        ((!messages[i + 1].sender.doctor ||
          messages[i + 1].sender.doctor._id !== currentSenderId) &&
          (!messages[i + 1].sender.user ||
            messages[i + 1].sender.user._id !== currentSenderId)) &&
        ((m.sender.doctor && m.sender.doctor._id !== userId) ||
          (m.sender.user && m.sender.user._id !== userId))) ||
      (i === messages.length - 1 && currentSenderId !== userId)
    ) {
      return 0;
    } else {
      return "auto";
    }
  };

  export const isSameSender = (messages, m, i, userId) => {
    console.log(messages, userId);
    const currentSenderId =
      m.sender.user && m.sender.user._id
        ? m.sender.user._id
        : m.sender.doctor._id;
    const nextSenderId =
      messages[i + 1] &&
      (messages[i + 1].sender.user && messages[i + 1].sender.user._id
        ? messages[i + 1].sender.user._id
        : messages[i + 1].sender.doctor._id);
  
    return (
      i < messages.length - 1 &&
      currentSenderId !== nextSenderId &&
      currentSenderId !== userId
    );
  };

  export const isSameUser = (messages, m, i) => {
    if(i > 0){
    console.log(messages[i - 1]);
    console.log(i);
    const currentSenderId =
      m.sender.user && m.sender.user._id
        ? m.sender.user._id
        : m.sender.doctor._id;
    const previousSenderId =
      messages[i-1].sender.user && messages[i-1].sender.user._id
        ? messages[i-1].sender.user._id
        : messages[i-1].sender.doctor._id;
        return i > 0 && currentSenderId === previousSenderId;
      }
  };
  
  
  export const getSender = (loggedUser, users) => {
    console.log(users,'users');
    console.log(loggedUser,'loggedusers');
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  };
  
  export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };