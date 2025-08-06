import { useCallback, useEffect, useState } from "react";
import ScrollBar from "react-perfect-scrollbar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Clear from "@mui/icons-material/Clear";
import TagFaces from "@mui/icons-material/TagFaces";
import Attachment from "@mui/icons-material/Attachment";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";

import { H5, H6, Small, Span } from "./Typography";
import { ChatAvatar } from "app/components";
import { convertHexToRGB } from "app/utils/utils";

// STYLED COMPONENTS
const ChatContainer = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "#fff"
});

const StyledScrollBar = styled(ScrollBar)({ flexGrow: 1 });

const ProfileBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 12px 12px 20px",
  color: theme.palette.primary.main,
  background: "#fafafa"
}));

const ChatStatus = styled("div")(({ theme }) => ({
  marginLeft: "12px",
  color: theme.palette.primary.main,
  "& span": { fontWeight: "500" },
  "& h5": { marginTop: 0, fontSize: "14px", marginBottom: "3px" }
}));

const ChatMessage = styled("div")(({ theme }) => ({
  padding: "8px",
  maxWidth: 240,
  fontSize: "14px",
  borderRadius: "4px",
  marginBottom: "8px",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  color: theme.palette.primary.main,
  background: "#fafafa"
}));

const MessageTime = styled("span")(({ theme }) => ({
  fontSize: "13px",
  fontWeight: "500",
  color: theme.palette.primary.main
}));

const ChatImgContainer = styled("div")({
  padding: "20px",
  display: "flex",
  justifyContent: "flex-end"
});

const ChatImgBox = styled("div")(({ theme }) => ({
  padding: "8px",
  fontSize: "14px",
  maxWidth: 240,
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  color: theme.palette.primary.main,
  background: "#fafafa"
}));

const ChatImg = styled("img")(() => ({ width: "40px" }));

// Chat Summary Style
const DeliveryItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "unread"
})(({ theme, unread }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "12px 16px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  background: unread ? "#f3f6ff" : "#fff",
  cursor: "pointer",
  color: theme.palette.primary.main,
  "&:hover": {
    background: "#f0f0f0"
  }
}));

const DeliveryRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
});

const MessagePreview = styled(Small)(({ theme }) => ({
  marginTop: 4,
  color: theme.palette.secondary.main,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "80%"
}));

const MessageList = [
  // Delivery #20341 - driver: Jason Alexander
  {
    contactId: "#20341",
    text: "Driver reports customer isn’t answering the door. What should we do?",
    time: "2025-08-03T09:00:00Z",
    id: "#20341",
    name: "Depot B",
    avatar: "/assets/images/you.png",
    status: "online",
    mood: ""
  },
  {
    contactId: "#20341",
    text: "Can you confirm if a delivery notification was sent?",
    time: "2025-08-03T09:10:00Z",
    id: "#20341",
    name: "Depot A",
    avatar: "/assets/images/you.png",
    status: "online",
    mood: ""
  },
  {
    contactId: "#20341",
    text: "Yes, we sent a text yesterday.",
    time: "2025-08-03T09:12:00Z",
    id: "#20341",
    name: "Depot B",
    avatar: "/assets/images/you.png",
    status: "online",
    mood: ""
  },
  {
    contactId: "#20341",
    text: "Please take a photo of the premises and attempt redelivery tomorrow.",
    time: "2025-08-03T09:13:00Z",
    id: "#20341",
    name: "Depot A",
    avatar: "/assets/images/you.png",
    status: "online",
    mood: ""
  },
  {
    contactId: "#20341",
    text: "Took the photo. Leaving a missed delivery card.",
    time: "2025-08-03T09:14:00Z",
    id: "#20341",
    name: "Jason Alexander",
    avatar: "/assets/images/face-1.jpg",
    status: "online",
    mood: ""
  },

  // Delivery #30144 - driver: Jason Alexander
  {
    contactId: "#30144",
    text: "Customer requested delay. Should we hold?",
    time: "2025-08-03T10:05:00Z",
    id: "#30144",
    name: "Depot A",
    avatar: "/assets/images/you.png",
    status: "online",
    mood: ""
  },
  {
    contactId: "#30144",
    text: "Delivery on hold. Please advise.",
    time: "2025-08-03T10:08:00Z",
    id: "#30144",
    name: "Depot B",
    avatar: "/assets/images/you.png",
    status: "online",
    mood: ""
  },
  {
    contactId: "#30144",
    text: "Hold until further notice. Will update EOD.",
    time: "2025-08-03T10:10:00Z",
    id: "#30144",
    name: "Depot A",
    avatar: "/assets/images/you.png",
    status: "online",
    mood: ""
  },

  // Delivery #10456 - driver: Sarah Lee
  {
    contactId: "#10456",
    text: "Attempted delivery. No one home.",
    time: "2025-08-03T08:45:00Z",
    id: "#10456",
    name: "Sarah Lee",
    avatar: "/assets/images/face-4.jpg",
    status: "online",
    mood: ""
  },
  {
    contactId: "#10456",
    text: "Customer not at home.",
    time: "2025-08-03T08:50:00Z",
    id: "#10456",
    name: "Depot A",
    avatar: "/assets/images/you.png",
    status: "online",
    mood: ""
  },
  {
    contactId: "#10456",
    text: "Please re-attempt delivery tomorrow morning.",
    time: "2025-08-03T08:55:00Z",
    id: "#10456",
    name: "Depot A",
    avatar: "/assets/images/you.png",
    status: "online",
    mood: ""
  }
];

const deliveryData = [
  {
    id: "#20341",
    drivername: "Jason Alexander",
    address: "237 King St",
    lastMessage: "Jason: IMG_20250803_1120.png",
    unread: false
  },
  {
    id: "#30144",
    drivername: "Jason Alexander",
    address: "84 Maple Ave",
    lastMessage: "Depot A: Hold until further notice. Will update EOD.",
    unread: true
  },
  {
    id: "#10456",
    drivername: "Sarah Lee",
    address: "56 Elm St",
    lastMessage: "Depot A: Please re-attempt delivery tomorrow morning.",
    unread: false
  }
];

// COMPONENT
export default function ChatDashboard({ togglePopup }) {
  const [isAlive, setIsAlive] = useState(true);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const currentUsername = "Jason Alexander";
  const chatBottomRef = document.querySelector("#chat-scroll");

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const textPrimary = palette.text.primary;

  const scrollToBottom = useCallback(() => {
    const chatBottomRef = document.getElementById("chat-scroll");
    if (chatBottomRef) {
      chatBottomRef.scrollTo({
        top: chatBottomRef.scrollHeight,
        behavior: "smooth"
      });
    }
  }, []);

  const sendMessageOnEnter = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const tempMessage = message.trim();
      if (tempMessage !== "") {
        const tempList = [
          ...messageList,
          {
            text: tempMessage,
            // contactId: currentUserId,
            name: "Jason Alexander",
            avatar: "/assets/images/face-1.jpg"
          }
        ];
        setMessageList(tempList);
        dummyReply(tempMessage);
        setMessage("");
      }
    }
  };

  const dummyReply = (tempMessage) => {
    setTimeout(() => {
      const updatedList = [
        ...messageList,
        {
          text: tempMessage,
          contactId: "opponent-id",
          avatar: "/assets/images/face-1.jpg",
          name: selectedDelivery?.name || "Jason Alexander"
        }
      ];
      setMessageList(updatedList);
    }, 1500);
  };
  useEffect(() => {
    if (isAlive) {
      setMessageList([MessageList]);
    }
  }, [isAlive]);

  useEffect(() => {
    scrollToBottom();
    return () => setIsAlive(false);
  }, [messageList, scrollToBottom]);

  useEffect(() => {
    if (selectedDelivery) {
      const filteredMessages = MessageList.filter((msg) => msg.contactId === selectedDelivery.id);
      setMessageList(filteredMessages);
    }
  }, [selectedDelivery]);

  return (
    <ChatContainer>
      <ProfileBox>
        <Box display="flex" alignItems="center">
          <ChatStatus>
            <H5>{selectedDelivery ? selectedDelivery.id : "Delivery Dashboard"}</H5>
          </ChatStatus>
        </Box>
        <IconButton onClick={() => (selectedDelivery ? setSelectedDelivery(null) : togglePopup())}>
          <Clear fontSize="small" />
        </IconButton>
      </ProfileBox>

      <StyledScrollBar id="chat-scroll">
        {!selectedDelivery ? (
          deliveryData.map((item, ind) => (
            <DeliveryItem key={ind} unread={item.unread} onClick={() => setSelectedDelivery(item)}>
              <DeliveryRow>
                <Box>
                  <H5 fontSize={14} mb={0}>
                    {item.id} - {item.drivername}
                  </H5>
                  <Small>{item.address}</Small>
                </Box>
                <IconButton size="small">
                  <Badge color="primary" variant="dot" invisible={!item.unread}>
                    <ChatBubbleOutlineIcon fontSize="small" />
                  </Badge>
                </IconButton>
              </DeliveryRow>
              {/* <MessagePreview>{item.lastMessage}</MessagePreview> */}
              {item.unread && <MessagePreview>{item.lastMessage}</MessagePreview>}
            </DeliveryItem>
          ))
        ) : (
          <>
            {messageList.map((item, ind) => (
              <Box
                key={ind}
                p="20px"
                display="flex"
                sx={{
                  justifyContent: currentUsername === item.name ? "flex-end" : "flex-start"
                }}
              >
                <Avatar src={item.avatar} />
                <Box ml="12px">
                  <H5 mb={0.5} fontSize={14} color={primary}>
                    {item.name}
                  </H5>
                  <ChatMessage>{item.text}</ChatMessage>
                  <MessageTime>1 minute ago</MessageTime>
                </Box>
              </Box>
            ))}

            {/* Example image message */}
            {selectedDelivery?.id === "#20341" && (
              <ChatImgContainer>
                <Avatar src="/assets/images/face-1.jpg" />
                <Box ml="12px">
                  <H5 mb={0.5} fontSize={14} color={primary}>
                    Jason Alexander
                  </H5>
                  <ChatImgBox>
                    <ChatImg alt="laptop" src="/assets/images/CameraIcon.png" />
                    <Box ml="12px">
                      <H6 mt={0} mb={0.5}>
                        IMG_20250803_1120.png
                      </H6>
                      <MessageTime>21.5KB</MessageTime>
                    </Box>
                  </ChatImgBox>
                  <MessageTime>1 minute ago</MessageTime>
                </Box>
              </ChatImgContainer>
            )}
          </>
        )}
      </StyledScrollBar>

      {selectedDelivery && (
        <div>
          <Divider sx={{ background: `rgba(${convertHexToRGB(textPrimary)}, 0.15)` }} />
          <TextField
            multiline
            fullWidth
            rowsMax={4}
            value={message}
            placeholder="Type here ..."
            onKeyUp={sendMessageOnEnter}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ "& textarea": { color: primary }}}
            slotProps={{
              input: {
                endAdornment: (
                  <Box display="flex">
                    <IconButton size="small">
                      <TagFaces />
                    </IconButton>
                    <IconButton size="small">
                      <Attachment />
                    </IconButton>
                  </Box>
                ),
                classes: { root: "pl-5 pr-3 py-3 text-body" }
              }
            }}
          />
        </div>
      )}
    </ChatContainer>
  );
}
