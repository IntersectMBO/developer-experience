module Main where

-- Define an add function
add :: Int -> Int -> Int
add x y = x + y

-- Define a sum function using fold
sumList :: [Int] -> Int
sumList = foldr (+) 0

main :: IO ()
main = do
  putStrLn "Hello, Haskell!"
  let a = add 5 3
  let b = sumList [1, 2, 3, 4]
  putStrLn $ "add 5 3 = " ++ show a
  putStrLn $ "sumList [1..4] = " ++ show b
