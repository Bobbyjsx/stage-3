import { getServerSession } from "next-auth";
import { handler } from "./auth/[...nextauth]/route";
import {
	NextApiHandler,
	NextApiRequest,
	NextApiResponse,
} from "next";

export const handlers: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const session = await getServerSession(req, res, handler);
	if (session) {
		res.send({
			content: "This is visible because you are authenticated",
		});
	} else {
		res.send({
			content:
				"This is not visible because you are not authenticated",
		});
	}
};
