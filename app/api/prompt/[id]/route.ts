import Prompt from '@models/prompt';
import User from '@models/user';
import { connectToDB } from '@utils/database';
// GET
export const GET = async (_: any, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) return new Response('Prompt not found', { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch prompt', { status: 500 });
  }
};

//Patch
export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    const { prompt, tag } = await req.json();

    const exisitingPrompt = await Prompt.findById(params.id).populate('creator');

    if (!exisitingPrompt) return new Response('Prompt not found', { status: 404 });

    exisitingPrompt.prompt = prompt;
    exisitingPrompt.tag = tag;

    await exisitingPrompt.save();

    return new Response(JSON.stringify(exisitingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch prompt', { status: 500 });
  }
};

// Delete
export const DELETE = async (_: any, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response('Prompt deleted succcessfully', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to delete prompt', { status: 500 });
  }
};
