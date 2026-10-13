import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Parameter userId wajib disertakan.' }, { status: 400 });
    }

    const supabaseAdmin = createServerClient();
    const { data, error } = await (supabaseAdmin
      .from('users' as any) as any)
      .select('id, full_name, role, stored_signature')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      storedSignature: data?.stored_signature || null
    });
  } catch (error: any) {
    console.error('Error in GET /api/user/signature:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, signatureData } = body;

    if (!userId || !signatureData) {
      return NextResponse.json(
        { success: false, error: 'Parameter userId dan signatureData wajib disertakan.' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createServerClient();
    const { data, error } = await (supabaseAdmin
      .from('users' as any) as any)
      .update({ stored_signature: signatureData })
      .eq('id', userId)
      .select('id, stored_signature')
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      storedSignature: data?.stored_signature,
      message: 'Tanda tangan digital berhasil disimpan di profil Anda.'
    });
  } catch (error: any) {
    console.error('Error in POST /api/user/signature:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Gagal menyimpan tanda tangan profil.' }, { status: 500 });
  }
}
