import React from "react";
import { EmailShareButton,LinkedinIcon, LineShareButton, EmailIcon, WhatsappIcon, WhatsappShareButton, TwitterShareButton, TwitterIcon, TelegramIcon, TelegramShareButton } from "react-share";
import { MdEmail } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";


function Share({ url,shareToggle }) {
  return (
    <div className=" flex flex-col px-4 shadow-lg border lg:w-[70%] pt-3  bg-white absolute rounded-md top-10 right-4">
      <div className="ms-auto cursor-pointer" onClick={shareToggle} >
        <IoMdClose size={25} />
      </div>
      <div className="flex pt-3 gap-3 pb-4">
        <EmailShareButton   url={url}>
          <EmailIcon round size={30} />
        </EmailShareButton>

        <LineShareButton url={url}>
          <LinkedinIcon round={true} size={30} />
        </LineShareButton>

        <WhatsappShareButton url={url}>
          <WhatsappIcon round={true} size={30} />
        </WhatsappShareButton>

        <TwitterShareButton url={url}>
          <TwitterIcon round={true} size={30} />
        </TwitterShareButton>

        <TelegramShareButton url={url}>
          <TelegramIcon round={true} size={30} />
        </TelegramShareButton>
      </div>
    </div>
  );
}

export default Share;
