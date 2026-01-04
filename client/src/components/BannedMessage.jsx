import { useNavigate } from "react-router-dom";
import useCurrentUser from "../hooks/auth/useCurrentUser";

function BannedMessage() {
  const { user } = useCurrentUser();
  const navigation = useNavigate();
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <p className="py-4">
          Your account is currently banned.{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigation(`/profile/${user?._id}`)}
          >
            Visit your profile
          </span>{" "}
          to see the ban duration.
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default BannedMessage;
