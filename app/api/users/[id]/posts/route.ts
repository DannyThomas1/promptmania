import User from '@models/user';
import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';
export const GET = async (_: any, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};
