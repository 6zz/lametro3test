import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const store = getStore("uploads");
  
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const fileName = file.name;

    await store.set(fileName, new Uint8Array(fileBuffer), {
      metadata: {
        contentType: file.type,
        size: file.size
      }
    });

    return new Response(`File ${fileName} uploaded successfully`, { 
        status: 200, 
        headers: {
            ['Access-Control-Allow-Origin']: '*'
        } 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return new Response('Error uploading file', { status: 500 });
  }
};

export const config = {
  path: "/api/upload"
};