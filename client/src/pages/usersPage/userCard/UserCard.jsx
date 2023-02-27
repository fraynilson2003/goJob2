import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetail } from "../../../redux/actions/userActions";

export default function UserCard({ user }) {
  const disaptch = useDispatch();

  const handleDetail = () => {
    disaptch(getUserDetail(user.id));
  };

  return (
    <>
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="px-3 py-4">
          <h1>{user.id}</h1>
        </td>
        <th
          scope="row"
          class="flex items-center py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div class="pl-3">
            <div class="text-base font-semibold">
              {user.firstName} {user.lastName}
            </div>
            <div class="font-normal text-gray-500">{user.email}</div>
          </div>
        </th>
        <td class="px-3 py-4">
          <h1>{user.role}</h1>
        </td>
        <td class="px-3 py-4">
          {user.Jobs.map((e) => (
            <h1>- {e.name}</h1>
          ))}
        </td>
        <td class="px-3 py-4">
          <div class="flex items-center">
            {user.state ? (
              <>
                <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                <h1>Active</h1>
              </>
            ) : (
              <>
                <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>{" "}
                <h1>No active</h1>
              </>
            )}
          </div>
        </td>
        <td class="px-3 py-4">
          <button>
            <Link
              to={`/user/detail/professional/${user.id}`}
              onClick={handleDetail}
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Detail user
            </Link>
          </button>
        </td>
      </tr>
    </>
  );
}
