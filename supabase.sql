create table partecipazioni (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  nome text not null check (char_length(nome) between 1 and 60),
  cognome text not null check (char_length(cognome) between 1 and 60),
  partecipa boolean not null,
  durata text check (durata in ('un_giorno','due_tre','tutti')),
  giorni text[],
  tira boolean
);
alter table partecipazioni enable row level security;
-- chiunque può inviare una risposta, ma nessuno può leggerla dal sito:
-- le risposte si vedono solo dal pannello Supabase (Table Editor)
create policy "invio pubblico" on partecipazioni for insert to anon with check (true);
