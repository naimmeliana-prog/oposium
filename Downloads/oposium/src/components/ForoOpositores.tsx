import React, { useState } from 'react';
import { useOpposition } from '../context/OppositionContext';
import { MessageSquare, Heart, PlusCircle, User, MessageCircle, Filter, Send } from 'lucide-react';
import type { ForumPost } from '../types';

export const ForoOpositores: React.FC = () => {
  const { selectedOpposition, forumPosts, setForumPosts } = useOpposition();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('Todos los temas');
  const [showNewPostModal, setShowNewPostModal] = useState<boolean>(false);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('Foro Común General');
  const [newContent, setNewContent] = useState('');

  // Reply text state per post
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  const categories = [
    'Todos los temas',
    'Foro Común General',
    'Grupo C2 - Auxilio Judicial',
    'Grupo C1 - Tramitación Procesal',
    'Técnicas de Estudio'
  ];

  const filteredPosts = forumPosts.filter(post => {
    if (activeCategoryFilter === 'Todos los temas') return true;
    return post.category === activeCategoryFilter;
  });

  const handleLikePost = (postId: string) => {
    setForumPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: ForumPost = {
      id: `fp_${Date.now()}`,
      oppositionId: selectedOpposition.id,
      author: 'Usuario_Registrado',
      authorRole: `Opositor ${selectedOpposition.name.split(' ')[0]}`,
      category: newCategory,
      title: newTitle,
      content: newContent,
      createdAt: 'Ahora mismo',
      likes: 0,
      replies: []
    };

    setForumPosts([newPost, ...forumPosts]);
    setNewTitle('');
    setNewContent('');
    setShowNewPostModal(false);
  };

  const handleAddReply = (postId: string) => {
    const text = replyTextMap[postId];
    if (!text || !text.trim()) return;

    setForumPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [
              ...post.replies,
              {
                id: `fpr_${Date.now()}`,
                author: 'Usuario_Registrado',
                authorRole: 'Opositor Activo',
                content: text,
                createdAt: 'Ahora mismo'
              }
            ]
          };
        }
        return post;
      })
    );

    setReplyTextMap(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
            Comunidad Privada de Opositores
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Foro de Discusión General & Específico
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Comparta dudas, comentarios de plazos y técnicas de estudio con otros opositores de forma privada.
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(!showNewPostModal)}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs md:text-sm rounded-xl shadow transition-all flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Crear Nueva Publicación
        </button>
      </div>

      {/* New Post Form Modal/Box */}
      {showNewPostModal && (
        <form onSubmit={handleAddPost} className="bg-white rounded-2xl border border-indigo-200 p-6 shadow-md space-y-4 animate-fade-in">
          <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-2">
            Publicar en la Comunidad Oposium
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Título de la Consulta</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Ej: Duda sobre plazos de reposición en el RDL 6/2023..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Categoría del Foro</label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value as ForumPost['category'])}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Foro Común General">Foro Común General</option>
                <option value="Grupo C2 - Auxilio Judicial">Grupo C2 - Auxilio Judicial</option>
                <option value="Grupo C1 - Tramitación Procesal">Grupo C1 - Tramitación Procesal</option>
                <option value="Técnicas de Estudio">Técnicas de Estudio</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Contenido de la Duda o Comentario</label>
            <textarea
              required
              rows={3}
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              placeholder="Describa su consulta con el mayor detalle posible..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowNewPostModal(false)}
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 shadow"
            >
              Publicar Mensaje
            </button>
          </div>
        </form>
      )}

      {/* Category Pills Filter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center gap-2 overflow-x-auto">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
        <span className="text-xs font-bold text-slate-500 shrink-0 mr-2">Filtrar por Categoría:</span>
        <div className="flex items-center gap-2 shrink-0">
          {categories.map(cat => {
            const isSelected = activeCategoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Forum Posts List */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No hay temas en esta categoría</h3>
            <p className="text-sm text-slate-500">Sé el primero en iniciar un debate o consulta en esta sección.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              {/* Post Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">{post.author}</span>
                    <span className="text-[10px] text-slate-500">{post.authorRole} • {post.createdAt}</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]">
                  {post.category}
                </span>
              </div>

              {/* Title & Body */}
              <div>
                <h3 className="text-base md:text-lg font-extrabold text-slate-900 mb-2">{post.title}</h3>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {post.content}
                </p>
              </div>

              {/* Actions & Likes */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className="flex items-center gap-1.5 text-rose-600 hover:text-rose-800 font-bold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100"
                >
                  <Heart className="w-4 h-4 fill-rose-600" />
                  {post.likes} Me gusta
                </button>

                <div className="flex items-center gap-1 text-slate-500 font-semibold">
                  <MessageCircle className="w-4 h-4 text-indigo-600" />
                  {post.replies.length} Respuestas
                </div>
              </div>

              {/* Replies Thread */}
              {post.replies.length > 0 && (
                <div className="pl-6 border-l-2 border-indigo-100 space-y-3 pt-2">
                  {post.replies.map(reply => (
                    <div key={reply.id} className="p-3 bg-indigo-50/40 rounded-xl border border-indigo-100 text-xs space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                        <span>{reply.author} ({reply.authorRole})</span>
                        <span>{reply.createdAt}</span>
                      </div>
                      <p className="text-slate-800 font-medium">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Reply Input */}
              <div className="pt-2 flex gap-2">
                <input
                  type="text"
                  value={replyTextMap[post.id] || ''}
                  onChange={e => setReplyTextMap({ ...replyTextMap, [post.id]: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && handleAddReply(post.id)}
                  placeholder="Escribe una respuesta a esta duda..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => handleAddReply(post.id)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  Responder
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
