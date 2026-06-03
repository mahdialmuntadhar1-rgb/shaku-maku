UPDATE posts
SET
  likes = 45 + (abs(random()) % 950),
  comments_count = 2 + (abs(random()) % 80),
  shares = 1 + (abs(random()) % 45),
  views = 250 + (abs(random()) % 9000)
WHERE id LIKE 'seed-social-%';