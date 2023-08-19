import React from "react";

const AiInput = () => {
  return (
    <div
      style={{
        position: "absolute",
        border: "1px solid rgb(242, 242, 242)",
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        borderRadius: "6px",
        padding: "8px 16px",
        width: "322px",
        marginRight: "2px",
        display: "flex",
        height: "38px",
        zIndex: 2,
        transformOrigin: "50% 100% 0px",
        opacity: 1,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.13)",
        bottom: "87px",
        transform: "scale(1)",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignContent: "center",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <svg
        class="vector"
        width="23"
        height="22"
        viewBox="0 0 23 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.9148 4.76281C17.7762 4.62441 17.6681 4.4586 17.5973 4.276V4.27438L16.0096 0.147432V0.145002C15.9934 0.102006 15.9643 0.065041 15.9264 0.0391091C15.8884 0.0131772 15.8434 -0.000470423 15.7974 1.23814e-05H15.7893C15.7436 -0.000138466 15.699 0.0136638 15.6614 0.0395738C15.6237 0.0654837 15.5949 0.102266 15.5787 0.145002L15.5771 0.147432L13.9895 4.276L13.9887 4.27681C13.9182 4.45906 13.8105 4.62511 13.672 4.76362M17.914 4.76281L18.455 4.22173ZM17.914 4.76281C18.0517 4.90051 18.2177 5.00905 18.4008 5.07952H18.4016L22.5302 6.66793C22.5742 6.68467 22.6121 6.71439 22.6388 6.75316C22.6656 6.79193 22.68 6.83791 22.68 6.88501C22.68 6.9317 22.6658 6.97729 22.6393 7.01576C22.6129 7.05422 22.5754 7.08376 22.5318 7.10047L18.404 8.68807H18.4024C18.2198 8.75882 18.0541 8.8669 17.9157 9.00541C17.7774 9.14391 17.6694 9.30978 17.5989 9.4924V9.49321L16.0096 13.6218C15.993 13.6656 15.9635 13.7033 15.9249 13.7299C15.8864 13.7566 15.8406 13.7708 15.7938 13.7708C15.7469 13.7708 15.7012 13.7566 15.6626 13.7299C15.6241 13.7033 15.5945 13.6656 15.5779 13.6218L13.9911 9.49483V9.49321C13.9205 9.31059 13.8125 9.14476 13.674 9.00638C13.5354 8.868 13.3695 8.76012 13.1868 8.68969H13.186L9.08253 7.11019L9.07362 7.10695C9.02566 7.08937 8.98426 7.0575 8.955 7.01564C8.92574 6.97377 8.91003 6.92394 8.91 6.87286C8.9114 6.82866 8.92583 6.78585 8.95148 6.74982C8.97714 6.71379 9.01286 6.68615 9.05418 6.67036L9.05742 6.66874L13.1844 5.08195H13.186C13.3682 5.01067 13.5343 4.90213 13.672 4.76362M13.672 4.76362L13.1317 4.22335ZM6.35607 15.5115C6.25847 15.4138 6.18232 15.2969 6.13251 15.1681L5.01147 12.2537V12.2521C5.00004 12.2219 4.97963 12.1959 4.95298 12.1776C4.92633 12.1594 4.89473 12.1497 4.86243 12.15H4.85676C4.82449 12.1499 4.79294 12.1595 4.76631 12.1778C4.73968 12.196 4.71925 12.2219 4.70772 12.2521V12.2537L3.58587 15.1681C3.53565 15.2977 3.45951 15.4151 3.3615 15.5123M6.35607 15.5115L6.73839 15.13ZM6.35607 15.5115C6.45327 15.6095 6.57072 15.6857 6.70032 15.7359L9.6147 16.8569C9.64564 16.8688 9.67225 16.8898 9.69105 16.9172C9.70984 16.9445 9.71993 16.9769 9.72 17.01C9.72011 17.0431 9.71007 17.0755 9.69125 17.1027C9.67242 17.1299 9.64571 17.1507 9.6147 17.1623L6.70194 18.2825H6.70113C6.57217 18.3324 6.45505 18.4087 6.35727 18.5065C6.2595 18.6043 6.18322 18.7214 6.13332 18.8503V18.852L5.01147 21.7647C4.99977 21.7956 4.97894 21.8223 4.95174 21.8411C4.92453 21.8599 4.89225 21.8699 4.85919 21.8699C4.82613 21.8699 4.79385 21.8599 4.76665 21.8411C4.73944 21.8223 4.71861 21.7956 4.70691 21.7647L3.58668 18.852V18.8503C3.53695 18.7215 3.46082 18.6045 3.36317 18.5068C3.26552 18.4092 3.14851 18.3331 3.01968 18.2833H3.01806L0.1215 17.1688L0.11502 17.1663C0.0812312 17.1539 0.0520798 17.1314 0.0315084 17.1018C0.010937 17.0723 -6.15966e-05 17.0371 2.59481e-07 17.0011C0.000870117 16.9698 0.0110389 16.9394 0.029213 16.9139C0.0473871 16.8884 0.0727448 16.8688 0.10206 16.8577H0.10368L3.01725 15.7367C3.14685 15.6865 3.2643 15.6103 3.3615 15.5123M3.3615 15.5123L2.97999 15.1308Z"
          fill="white"
          fill-opacity="0.9"
        />
      </svg>

      <input
        className="aiInput"
        placeholder="Feed me your ideas, I'll do the rest..."
        style={{
          textAlign: "left",
          borderWidth: "0px",
          outline: "none",
          fontFamily: "Roboto, sans-serif",
          fontSize: "0.875rem",
          width: "250px",
          fontWeight: 500,
          background: "transparent",
          color: "rgba(255, 255, 255, 0.5)",
          marginRight: "-10px",
        }}
      ></input>

      <svg
        style={{visibility:"hidden"}}
        class="vector2"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.679932 13.8939V17.4351H4.22111L14.6652 6.99095L11.124 3.44978L0.679932 13.8939ZM17.4037 4.25244C17.772 3.88416 17.772 3.28925 17.4037 2.92096L15.194 0.71127C14.8257 0.342988 14.2308 0.342988 13.8625 0.71127L12.1345 2.43936L15.6756 5.98054L17.4037 4.25244Z"
          fill="white"
          fill-opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default AiInput;
