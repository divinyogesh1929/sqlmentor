/* ═══════════════════════════════════════════════════════════════
   SQLMentor — app.js
   SQL Learning Platform — Client-Side (AlaSQL powered)
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── 1. DATABASE SCHEMA & SEED DATA ─────────────────────────── */
const DB_SETUP = `
  CREATE TABLE customers (
    customer_id INT,
    name        STRING,
    email       STRING,
    city        STRING,
    signup_date STRING,
    tier        STRING
  );
  INSERT INTO customers VALUES
    (101,'Aarav Sharma','aarav@email.com','Bangalore','2022-03-15','Gold'),
    (102,'Priya Nair','priya@email.com','Mumbai','2022-06-20','Silver'),
    (103,'Ravi Kumar','ravi@email.com','Delhi','2021-11-05','Platinum'),
    (104,'Sneha Iyer','sneha@email.com','Chennai','2023-01-12','Bronze'),
    (105,'Arjun Mehta','arjun@email.com','Bangalore','2022-08-30','Gold'),
    (106,'Kavya Reddy','kavya@email.com','Hyderabad','2023-03-22','Silver'),
    (107,'Rohan Das','rohan@email.com','Kolkata','2021-07-18','Bronze'),
    (108,'Anika Singh','anika@email.com','Pune','2022-12-01','Gold'),
    (109,'Suresh Pillai','suresh@email.com','Bangalore','2023-05-10','Platinum'),
    (110,'Meera Joshi','meera@email.com','Mumbai','2022-04-25','Silver');

  CREATE TABLE products (
    product_id   INT,
    product_name STRING,
    category     STRING,
    cost_price   NUMBER,
    sell_price   NUMBER
  );
  INSERT INTO products VALUES
    (201,'Wireless Headphones','Electronics',1200,2500),
    (202,'Running Shoes','Footwear',800,1800),
    (203,'SQL Textbook','Books',200,450),
    (204,'Laptop Stand','Electronics',400,950),
    (205,'Yoga Mat','Fitness',300,750),
    (206,'Mechanical Keyboard','Electronics',1500,3200),
    (207,'Coffee Mug','Kitchen',80,220),
    (208,'Water Bottle','Fitness',120,350),
    (209,'Desk Lamp','Electronics',350,800),
    (210,'Notebook Set','Stationery',150,380);

  CREATE TABLE orders (
    order_id    INT,
    customer_id INT,
    order_date  STRING,
    status      STRING,
    total_amount NUMBER
  );
  INSERT INTO orders VALUES
    (1001,101,'2024-01-15','Delivered',2500),
    (1002,102,'2024-01-16','Cancelled',800),
    (1003,101,'2024-02-03','Processing',1200),
    (1004,103,'2024-02-14','Delivered',4200),
    (1005,104,'2024-03-01','Delivered',750),
    (1006,105,'2024-03-18','Shipped',3200),
    (1007,106,'2024-04-05','Delivered',1950),
    (1008,107,'2024-04-22','Cancelled',450),
    (1009,108,'2024-05-10','Delivered',2800),
    (1010,109,'2024-05-25','Processing',5500),
    (1011,103,'2024-06-08','Delivered',1100),
    (1012,102,'2024-06-20','Delivered',630),
    (1013,101,'2024-07-03','Shipped',880),
    (1014,110,'2024-07-15','Delivered',3600),
    (1015,105,'2024-10-20','Cancelled',1350);

  CREATE TABLE order_items (
    item_id    INT,
    order_id   INT,
    product_id INT,
    quantity   INT,
    unit_price NUMBER
  );
  INSERT INTO order_items VALUES
    (1,1001,201,1,2500),
    (2,1002,202,1,800),
    (3,1003,204,1,950),(4,1003,207,2,220),
    (5,1004,206,1,3200),(6,1004,203,2,450),
    (7,1005,208,2,350),(8,1005,210,1,380),
    (9,1006,206,1,3200),
    (10,1007,209,1,800),(11,1007,205,1,750),(12,1007,207,1,220),
    (13,1008,205,1,750),
    (14,1009,201,1,2500),(15,1009,208,1,350),
    (16,1010,201,2,2500),(17,1010,206,1,3200),
    (18,1011,203,2,450),(19,1011,209,1,800),
    (20,1012,210,1,380),(21,1012,205,1,630),
    (22,1013,207,2,220),(23,1013,208,1,350),
    (24,1014,201,1,2500),(25,1014,206,1,3200),
    (26,1015,202,1,1350);
`;

/* ── 2. LESSONS DATA ─────────────────────────────────────────── */
const LESSONS = [
  {
    day: 1,
    title: "SELECT & FROM — Your First Query",
    phase: "Foundation",
    outcomes: ["Write your first SELECT query", "Understand table structure", "Use WHERE to filter", "Sort with ORDER BY"],
    concepts: [
      {
        title: "The SQL Sandwich",
        explain: `SQL (Structured Query Language) lets you ask questions to a database. Every query follows a predictable structure — think of it like building a sandwich layer by layer.
<br><br>
<strong>SELECT</strong> = What columns do you want to see?<br>
<strong>FROM</strong> = Which table has your data?<br>
<strong>WHERE</strong> = What conditions must rows meet?<br>
<strong>ORDER BY</strong> = How should results be sorted?`,
        analogy: `💡 Analogy: A table is like an Excel sheet. SELECT picks which columns to show (like hiding columns in Excel). WHERE filters rows (like AutoFilter). ORDER BY sorts the sheet. You're never modifying the original — just reading it.`,
        code: `<span class="cmt">-- Get all columns from customers table</span>
<span class="kw">SELECT</span> <span class="op">*</span>
<span class="kw">FROM</span>   customers;

<span class="cmt">-- Get specific columns only</span>
<span class="kw">SELECT</span> name, city, tier
<span class="kw">FROM</span>   customers;

<span class="cmt">-- Rename a column using AS (alias)</span>
<span class="kw">SELECT</span> name <span class="kw">AS</span> customer_name, city <span class="kw">AS</span> location
<span class="kw">FROM</span>   customers;`
      },
      {
        title: "WHERE — Filtering Rows",
        explain: `WHERE narrows down which rows you get back. Only rows where the condition is <strong>TRUE</strong> are returned.
<br><br>
You can combine conditions with <strong>AND</strong> (both must be true) and <strong>OR</strong> (at least one must be true).`,
        think: `🧠 Query Thinking Framework — answer these 4 questions BEFORE writing:<br>
1. What do I want to see? → SELECT columns<br>
2. Which table? → FROM table<br>
3. Any conditions? → WHERE clause<br>
4. Sorting needed? → ORDER BY`,
        code: `<span class="cmt">-- Single condition</span>
<span class="kw">SELECT</span> <span class="op">*</span> <span class="kw">FROM</span> orders <span class="kw">WHERE</span> status <span class="op">=</span> <span class="str">'Delivered'</span>;

<span class="cmt">-- Multiple conditions with AND</span>
<span class="kw">SELECT</span> order_id, total_amount
<span class="kw">FROM</span>   orders
<span class="kw">WHERE</span>  status <span class="op">=</span> <span class="str">'Delivered'</span>
  <span class="kw">AND</span>  total_amount <span class="op">></span> <span class="num">1000</span>;

<span class="cmt">-- IN shortcut (multiple OR on same column)</span>
<span class="kw">SELECT</span> <span class="op">*</span> <span class="kw">FROM</span> orders
<span class="kw">WHERE</span>  status <span class="kw">IN</span> (<span class="str">'Cancelled'</span>, <span class="str">'Processing'</span>);

<span class="cmt">-- BETWEEN for ranges (inclusive)</span>
<span class="kw">SELECT</span> <span class="op">*</span> <span class="kw">FROM</span> orders
<span class="kw">WHERE</span>  total_amount <span class="kw">BETWEEN</span> <span class="num">500</span> <span class="kw">AND</span> <span class="num">2000</span>;

<span class="cmt">-- ORDER BY sorts results</span>
<span class="kw">SELECT</span> name, city <span class="kw">FROM</span> customers
<span class="kw">ORDER BY</span> city <span class="kw">ASC</span>, name <span class="kw">DESC</span>;`
      }
    ],
    exercises: [
      {
        id:"d1e1", title:"All Bangalore Customers",
        difficulty:"easy",
        desc:`Write a query to show <strong>all columns</strong> from the <code>customers</code> table for customers whose <code>city</code> is <strong>'Bangalore'</strong>.`,
        hint:"Use SELECT * FROM customers and a WHERE clause filtering by city. String values need single quotes.",
        solution:"SELECT * FROM customers WHERE city = 'Bangalore';",
        check_type:"rows"
      },
      {
        id:"d1e2", title:"Electronics Products by Price",
        difficulty:"easy",
        desc:`List the <code>product_name</code> and <code>sell_price</code> of all products in the <strong>'Electronics'</strong> category, sorted from highest to lowest price.`,
        hint:"SELECT specific columns FROM products, filter by category, then ORDER BY sell_price DESC.",
        solution:"SELECT product_name, sell_price FROM products WHERE category = 'Electronics' ORDER BY sell_price DESC;",
        check_type:"rows"
      },
      {
        id:"d1e3", title:"Mid-Range Orders",
        difficulty:"medium",
        desc:`Find all orders with a <code>total_amount</code> between <strong>₹1000 and ₹3500</strong> that have a <code>status</code> of <strong>'Delivered'</strong>. Show <code>order_id</code>, <code>order_date</code>, and <code>total_amount</code>. Sort by <code>total_amount</code> descending.`,
        hint:"Use BETWEEN for the range. You need two conditions joined by AND. Don't forget ORDER BY at the end.",
        solution:"SELECT order_id, order_date, total_amount FROM orders WHERE total_amount BETWEEN 1000 AND 3500 AND status = 'Delivered' ORDER BY total_amount DESC;",
        check_type:"rows"
      },
      {
        id:"d1e4", title:"Gold & Platinum Customers",
        difficulty:"medium",
        desc:`Show the <code>name</code>, <code>city</code>, and <code>tier</code> of all customers who are either <strong>'Gold'</strong> or <strong>'Platinum'</strong> tier. Sort alphabetically by name.`,
        hint:"You can use OR conditions, or the cleaner IN(...) syntax. Both work the same way.",
        solution:"SELECT name, city, tier FROM customers WHERE tier IN ('Gold', 'Platinum') ORDER BY name;",
        check_type:"rows"
      },
      {
        id:"d1e5", title:"Revenue Leakage Report",
        difficulty:"hard",
        desc:`<strong>Business Scenario:</strong> Your manager says — <em>"I need a list of all cancelled orders above ₹1000. These represent revenue leakage. Show me the order ID, date, and amount, sorted from biggest loss to smallest."</em>
<br><br>Apply the Query Thinking Framework and write the query.`,
        hint:"Table: orders. Columns: order_id, order_date, total_amount. Filters: status = 'Cancelled' AND total_amount > 1000. Sort: total_amount DESC.",
        solution:"SELECT order_id, order_date, total_amount FROM orders WHERE status = 'Cancelled' AND total_amount > 1000 ORDER BY total_amount DESC;",
        check_type:"rows"
      }
    ]
  },
  {
    day: 2,
    title: "WHERE Deep Dive — Operators & NULL",
    phase: "Foundation",
    outcomes: ["LIKE for pattern matching", "NULL handling with IS NULL", "NOT operator", "Complex multi-condition filters"],
    concepts: [
      {
        title: "LIKE — Pattern Matching",
        explain: `LIKE lets you search for patterns in text columns. Two wildcards:<br><br>
<strong>%</strong> = any sequence of characters (zero or more)<br>
<strong>_</strong> = exactly one character`,
        code: `<span class="cmt">-- Names starting with 'A'</span>
<span class="kw">SELECT</span> <span class="op">*</span> <span class="kw">FROM</span> customers <span class="kw">WHERE</span> name <span class="kw">LIKE</span> <span class="str">'A%'</span>;

<span class="cmt">-- Names ending with 'a'</span>
<span class="kw">SELECT</span> <span class="op">*</span> <span class="kw">FROM</span> customers <span class="kw">WHERE</span> name <span class="kw">LIKE</span> <span class="str">'%a'</span>;

<span class="cmt">-- Email from gmail</span>
<span class="kw">SELECT</span> name, email <span class="kw">FROM</span> customers
<span class="kw">WHERE</span>  email <span class="kw">LIKE</span> <span class="str">'%@email.com'</span>;

<span class="cmt">-- NOT LIKE — exclude pattern</span>
<span class="kw">SELECT</span> <span class="op">*</span> <span class="kw">FROM</span> customers
<span class="kw">WHERE</span>  city <span class="kw">NOT LIKE</span> <span class="str">'%alore'</span>;</pre>`
      },
      {
        title: "NULL — The Silent Bug Killer",
        explain: `NULL means "no value" or "unknown". It is NOT zero, NOT empty string. This trips up almost every beginner.
<br><br>
<strong>Critical rule:</strong> You CANNOT use = NULL. You must use IS NULL or IS NOT NULL.`,
        analogy: `⚠️ NULL is not a value — it's the absence of a value. Think of it as an empty box. You can't ask "is this equal to empty?" — you ask "is this box empty?"`,
        code: `<span class="cmt">-- WRONG: this will never match anything!</span>
<span class="kw">SELECT</span> <span class="op">*</span> <span class="kw">FROM</span> customers <span class="kw">WHERE</span> city <span class="op">=</span> <span class="kw">NULL</span>;

<span class="cmt">-- CORRECT: always use IS NULL</span>
<span class="kw">SELECT</span> <span class="op">*</span> <span class="kw">FROM</span> customers <span class="kw">WHERE</span> city <span class="kw">IS NULL</span>;

<span class="cmt">-- Get rows that HAVE a value</span>
<span class="kw">SELECT</span> <span class="op">*</span> <span class="kw">FROM</span> customers <span class="kw">WHERE</span> city <span class="kw">IS NOT NULL</span>;`
      }
    ],
    exercises: [
      {
        id:"d2e1", title:"Find Gmail Users",
        difficulty:"easy",
        desc:`Find all customers whose email contains <strong>'@email.com'</strong>. Show their name and email.`,
        hint:"Use LIKE with the % wildcard. The pattern should match anything before @email.com.",
        solution:"SELECT name, email FROM customers WHERE email LIKE '%@email.com';",
        check_type:"rows"
      },
      {
        id:"d2e2", title:"Exclude Bangalore",
        difficulty:"easy",
        desc:`List all customers who are <strong>NOT</strong> from Bangalore. Show name, city, tier. Sort by city.`,
        hint:"You can use NOT LIKE or simply city <> 'Bangalore' (the not-equals operator).",
        solution:"SELECT name, city, tier FROM customers WHERE city <> 'Bangalore' ORDER BY city;",
        check_type:"rows"
      },
      {
        id:"d2e3", title:"Name Pattern Hunt",
        difficulty:"medium",
        desc:`Find all customers whose name starts with <strong>'A'</strong> or <strong>'S'</strong>, and signed up after <strong>'2022-06-01'</strong>. Show their name and signup_date.`,
        hint:"You need LIKE 'A%' OR LIKE 'S%'. Wrap the OR in parentheses when combined with AND!",
        solution:"SELECT name, signup_date FROM customers WHERE (name LIKE 'A%' OR name LIKE 'S%') AND signup_date > '2022-06-01';",
        check_type:"rows"
      },
      {
        id:"d2e4", title:"Product Profit Filter",
        difficulty:"medium",
        desc:`Find products where the profit margin (sell_price - cost_price) is <strong>greater than ₹1000</strong>. Show product_name, category, cost_price, sell_price. Sort by sell_price DESC.`,
        hint:"You can do arithmetic directly in WHERE: WHERE (sell_price - cost_price) > 1000.",
        solution:"SELECT product_name, category, cost_price, sell_price FROM products WHERE (sell_price - cost_price) > 1000 ORDER BY sell_price DESC;",
        check_type:"rows"
      },
      {
        id:"d2e5", title:"Churn Risk Report",
        difficulty:"hard",
        desc:`<strong>Business Scenario:</strong> Identify Bronze-tier customers from either Mumbai or Kolkata — these are at highest churn risk. Show their full details. Sort by signup_date (oldest first, so we can call them first).`,
        hint:"Tier filter is straightforward. For cities, use IN ('Mumbai', 'Kolkata') — cleaner than two OR conditions. Combine with AND.",
        solution:"SELECT * FROM customers WHERE tier = 'Bronze' AND city IN ('Mumbai', 'Kolkata') ORDER BY signup_date ASC;",
        check_type:"rows"
      }
    ]
  },
  {
    day: 3,
    title: "Functions & Calculated Columns",
    phase: "Foundation",
    outcomes: ["String functions: UPPER, LOWER, LEN", "Math: ROUND, ABS", "Calculated columns with aliases", "Combining functions"],
    concepts: [
      {
        title: "String & Math Functions",
        explain: `SQL has built-in functions you can apply to columns. <strong>String functions</strong> manipulate text. <strong>Math functions</strong> work on numbers. You can create new columns by writing expressions in SELECT.`,
        code: `<span class="cmt">-- String functions</span>
<span class="kw">SELECT</span>
  <span class="fn">UPPER</span>(name)            <span class="kw">AS</span> name_upper,
  <span class="fn">LOWER</span>(email)           <span class="kw">AS</span> email_lower,
  <span class="fn">LEN</span>(name)              <span class="kw">AS</span> name_length
<span class="kw">FROM</span> customers;

<span class="cmt">-- Math functions + calculated columns</span>
<span class="kw">SELECT</span>
  product_name,
  sell_price,
  cost_price,
  (sell_price <span class="op">-</span> cost_price)   <span class="kw">AS</span> profit,
  <span class="fn">ROUND</span>((sell_price <span class="op">-</span> cost_price) <span class="op">*</span> <span class="num">100.0</span> <span class="op">/</span> sell_price, <span class="num">2</span>) <span class="kw">AS</span> margin_pct
<span class="kw">FROM</span> products
<span class="kw">ORDER BY</span> profit <span class="kw">DESC</span>;`
      }
    ],
    exercises: [
      {
        id:"d3e1", title:"Name in Uppercase",
        difficulty:"easy",
        desc:`Show all customer names in <strong>UPPERCASE</strong> alongside their city. Alias the result as <code>customer_name</code>.`,
        hint:"Use the UPPER() function wrapping the name column.",
        solution:"SELECT UPPER(name) AS customer_name, city FROM customers;",
        check_type:"rows"
      },
      {
        id:"d3e2", title:"Profit Per Product",
        difficulty:"easy",
        desc:`Show each product's name, sell_price, cost_price, and a new calculated column called <code>profit</code> (sell_price minus cost_price). Sort by profit descending.`,
        hint:"You can do arithmetic directly in SELECT: (sell_price - cost_price) AS profit.",
        solution:"SELECT product_name, sell_price, cost_price, (sell_price - cost_price) AS profit FROM products ORDER BY profit DESC;",
        check_type:"rows"
      },
      {
        id:"d3e3", title:"Discounted Price",
        difficulty:"medium",
        desc:`Calculate a <strong>15% discounted price</strong> for every product. Show product_name, sell_price, and a column called <code>discounted_price</code> rounded to 2 decimal places. Only show Electronics products.`,
        hint:"Discounted price = sell_price * 0.85. Use ROUND(expression, 2) to round.",
        solution:"SELECT product_name, sell_price, ROUND(sell_price * 0.85, 2) AS discounted_price FROM products WHERE category = 'Electronics';",
        check_type:"rows"
      },
      {
        id:"d3e4", title:"Email Domain Extract",
        difficulty:"medium",
        desc:`Show each customer's name and the <strong>length of their email address</strong> (call it <code>email_length</code>). Sort by email_length descending. Only show customers with email length greater than 15.`,
        hint:"Use LEN(email) for the length. You can use the function in both SELECT and WHERE.",
        solution:"SELECT name, LEN(email) AS email_length FROM customers WHERE LEN(email) > 15 ORDER BY email_length DESC;",
        check_type:"rows"
      },
      {
        id:"d3e5", title:"Margin Analysis Report",
        difficulty:"hard",
        desc:`<strong>Business Scenario:</strong> Build a product profitability report showing: product_name, category, cost_price, sell_price, profit (sell - cost), and margin_percent calculated as <code>ROUND((profit/sell_price)*100, 1)</code>. Filter only products with margin above 50%. Sort by margin_percent descending.`,
        hint:"You can't directly reuse the alias 'profit' in WHERE — recalculate the expression. Or use a subquery (preview of Day 7!).",
        solution:"SELECT product_name, category, cost_price, sell_price, (sell_price - cost_price) AS profit, ROUND((sell_price - cost_price) * 100.0 / sell_price, 1) AS margin_percent FROM products WHERE (sell_price - cost_price) * 100.0 / sell_price > 50 ORDER BY margin_percent DESC;",
        check_type:"rows"
      }
    ]
  },
  {
    day: 4,
    title: "GROUP BY & Aggregate Functions",
    phase: "Foundation",
    outcomes: ["COUNT, SUM, AVG, MIN, MAX", "GROUP BY to aggregate", "HAVING to filter groups", "Business KPI queries"],
    concepts: [
      {
        title: "Aggregate Functions",
        explain: `Aggregate functions <strong>collapse multiple rows into a single value</strong>. They're the foundation of all reporting and KPI queries.`,
        code: `<span class="cmt">-- Basic aggregates across ALL rows</span>
<span class="kw">SELECT</span>
  <span class="fn">COUNT</span>(<span class="op">*</span>)              <span class="kw">AS</span> total_orders,
  <span class="fn">SUM</span>(total_amount)    <span class="kw">AS</span> total_revenue,
  <span class="fn">AVG</span>(total_amount)    <span class="kw">AS</span> avg_order_value,
  <span class="fn">MIN</span>(total_amount)    <span class="kw">AS</span> smallest_order,
  <span class="fn">MAX</span>(total_amount)    <span class="kw">AS</span> largest_order
<span class="kw">FROM</span> orders;

<span class="cmt">-- GROUP BY: aggregate PER group</span>
<span class="kw">SELECT</span>
  status,
  <span class="fn">COUNT</span>(<span class="op">*</span>)         <span class="kw">AS</span> order_count,
  <span class="fn">SUM</span>(total_amount) <span class="kw">AS</span> total_revenue
<span class="kw">FROM</span>   orders
<span class="kw">GROUP BY</span> status
<span class="kw">ORDER BY</span> total_revenue <span class="kw">DESC</span>;

<span class="cmt">-- HAVING filters groups (not rows)</span>
<span class="kw">SELECT</span> customer_id, <span class="fn">COUNT</span>(<span class="op">*</span>) <span class="kw">AS</span> num_orders
<span class="kw">FROM</span>   orders
<span class="kw">GROUP BY</span> customer_id
<span class="kw">HAVING</span> <span class="fn">COUNT</span>(<span class="op">*</span>) <span class="op">>=</span> <span class="num">2</span>;`
      },
      {
        title: "WHERE vs HAVING",
        explain: `This is one of the most common interview questions. <strong>WHERE</strong> filters individual rows BEFORE grouping. <strong>HAVING</strong> filters groups AFTER aggregation.`,
        analogy: `🧠 Think of it this way: WHERE is a bouncer at the door (filters who gets in). HAVING is a bouncer inside (filters groups after they form).`,
        code: `<span class="cmt">-- WHERE filters rows first, then GROUP BY aggregates</span>
<span class="kw">SELECT</span> category, <span class="fn">SUM</span>(sell_price) <span class="kw">AS</span> total
<span class="kw">FROM</span>   products
<span class="kw">WHERE</span>  sell_price <span class="op">></span> <span class="num">500</span>       <span class="cmt">-- filters ROWS first</span>
<span class="kw">GROUP BY</span> category
<span class="kw">HAVING</span> <span class="fn">SUM</span>(sell_price) <span class="op">></span> <span class="num">3000</span>; <span class="cmt">-- filters GROUPS after`
      }
    ],
    exercises: [
      {
        id:"d4e1", title:"Orders by Status",
        difficulty:"easy",
        desc:`Count the number of orders for each <code>status</code>. Show status and order_count. Sort by order_count descending.`,
        hint:"GROUP BY status, then COUNT(*) AS order_count.",
        solution:"SELECT status, COUNT(*) AS order_count FROM orders GROUP BY status ORDER BY order_count DESC;",
        check_type:"rows"
      },
      {
        id:"d4e2", title:"Revenue by Category",
        difficulty:"easy",
        desc:`Find the total <code>sell_price</code> for each product <code>category</code>. Call it <code>total_value</code>. Sort by total_value descending.`,
        hint:"SUM(sell_price) grouped by category.",
        solution:"SELECT category, SUM(sell_price) AS total_value FROM products GROUP BY category ORDER BY total_value DESC;",
        check_type:"rows"
      },
      {
        id:"d4e3", title:"Repeat Customers",
        difficulty:"medium",
        desc:`Find all customers who have placed <strong>more than 1 order</strong>. Show customer_id and their order count (as <code>num_orders</code>). Sort by num_orders descending.`,
        hint:"COUNT(*) per customer_id, then HAVING COUNT(*) > 1.",
        solution:"SELECT customer_id, COUNT(*) AS num_orders FROM orders GROUP BY customer_id HAVING COUNT(*) > 1 ORDER BY num_orders DESC;",
        check_type:"rows"
      },
      {
        id:"d4e4", title:"High-Value City Revenue",
        difficulty:"medium",
        desc:`Find cities where total order revenue exceeds <strong>₹3000</strong>. Show customer_id and total_spent. Use HAVING for the filter. Sort by total_spent descending.`,
        hint:"SUM(total_amount) per customer_id, then HAVING SUM(...) > 3000.",
        solution:"SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id HAVING SUM(total_amount) > 3000 ORDER BY total_spent DESC;",
        check_type:"rows"
      },
      {
        id:"d4e5", title:"Delivered Revenue KPI",
        difficulty:"hard",
        desc:`<strong>Business Scenario:</strong> Build a revenue KPI summary showing: for each order status, the count of orders, total revenue, average order value (rounded to 0 decimal), and the minimum and maximum order amounts. Only include statuses with at least 2 orders.`,
        hint:"Use COUNT(*), SUM, ROUND(AVG(...),0), MIN, MAX all in one SELECT. GROUP BY status. HAVING COUNT(*) >= 2.",
        solution:"SELECT status, COUNT(*) AS order_count, SUM(total_amount) AS total_revenue, ROUND(AVG(total_amount), 0) AS avg_order, MIN(total_amount) AS min_order, MAX(total_amount) AS max_order FROM orders GROUP BY status HAVING COUNT(*) >= 2 ORDER BY total_revenue DESC;",
        check_type:"rows"
      }
    ]
  },
  {
    day: 5,
    title: "JOINs — Combining Tables",
    phase: "Intermediate",
    outcomes: ["INNER JOIN logic", "LEFT JOIN for outer matches", "Multi-table joins", "Real business join queries"],
    concepts: [
      {
        title: "INNER JOIN — Only Matching Rows",
        explain: `A JOIN combines rows from two tables based on a related column. <strong>INNER JOIN</strong> returns only rows that have a match in BOTH tables. If a row in table A has no match in table B, it's excluded.`,
        analogy: `🔗 Think of two lists: customers and orders. INNER JOIN is like a Venn diagram intersection — only customers WHO HAVE orders, and only orders WHO HAVE a matching customer.`,
        code: `<span class="cmt">-- Join customers with their orders</span>
<span class="kw">SELECT</span>
  c.name,
  c.city,
  o.order_id,
  o.total_amount,
  o.status
<span class="kw">FROM</span>      customers c
<span class="kw">INNER JOIN</span> orders    o <span class="kw">ON</span> c.customer_id <span class="op">=</span> o.customer_id
<span class="kw">ORDER BY</span>  c.name;`
      },
      {
        title: "LEFT JOIN — Keep All Left Table Rows",
        explain: `<strong>LEFT JOIN</strong> returns ALL rows from the left table, plus matching rows from the right table. If there's no match in the right table, NULLs fill those columns.`,
        analogy: `📋 LEFT JOIN = "Give me all customers, and if they've ordered, show me their order too. If they haven't ordered, still show the customer (with NULL for order fields)."`,
        code: `<span class="cmt">-- All customers, with or without orders</span>
<span class="kw">SELECT</span>
  c.name,
  c.tier,
  <span class="fn">COUNT</span>(o.order_id)    <span class="kw">AS</span> order_count,
  <span class="fn">SUM</span>(o.total_amount)  <span class="kw">AS</span> total_spent
<span class="kw">FROM</span>      customers c
<span class="kw">LEFT JOIN</span> orders    o <span class="kw">ON</span> c.customer_id <span class="op">=</span> o.customer_id
<span class="kw">GROUP BY</span>  c.customer_id, c.name, c.tier
<span class="kw">ORDER BY</span>  total_spent <span class="kw">DESC</span>;`
      }
    ],
    exercises: [
      {
        id:"d5e1", title:"Customer Order Details",
        difficulty:"easy",
        desc:`Join <code>customers</code> and <code>orders</code> to show customer <code>name</code>, <code>city</code>, <code>order_id</code>, and <code>total_amount</code>. Only show delivered orders.`,
        hint:"INNER JOIN on customer_id. Add WHERE o.status = 'Delivered' after the JOIN.",
        solution:"SELECT c.name, c.city, o.order_id, o.total_amount FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id WHERE o.status = 'Delivered';",
        check_type:"rows"
      },
      {
        id:"d5e2", title:"Products in Orders",
        difficulty:"easy",
        desc:`Join <code>order_items</code> with <code>products</code> to show product_name, quantity, and unit_price for every line item. Sort by order_id.`,
        hint:"Join on product_id. SELECT from order_items and pull product_name from products.",
        solution:"SELECT oi.order_id, p.product_name, oi.quantity, oi.unit_price FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id ORDER BY oi.order_id;",
        check_type:"rows"
      },
      {
        id:"d5e3", title:"Customer Spend Summary",
        difficulty:"medium",
        desc:`Show each customer's <code>name</code>, <code>tier</code>, total number of orders (<code>order_count</code>), and total amount spent (<code>total_spent</code>). Use LEFT JOIN so customers with no orders appear too. Sort by total_spent DESC.`,
        hint:"LEFT JOIN orders on customer_id. GROUP BY customer fields. COUNT(o.order_id) handles NULLs correctly (won't count NULL rows).",
        solution:"SELECT c.name, c.tier, COUNT(o.order_id) AS order_count, SUM(o.total_amount) AS total_spent FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.name, c.tier ORDER BY total_spent DESC;",
        check_type:"rows"
      },
      {
        id:"d5e4", title:"3-Table Join",
        difficulty:"medium",
        desc:`Join <code>orders</code>, <code>order_items</code>, and <code>products</code> together. Show order_id, product_name, category, quantity, and unit_price for all order items. Filter only 'Electronics' category products.`,
        hint:"Chain two JOINs: orders → order_items (on order_id), then order_items → products (on product_id).",
        solution:"SELECT o.order_id, p.product_name, p.category, oi.quantity, oi.unit_price FROM orders o INNER JOIN order_items oi ON o.order_id = oi.order_id INNER JOIN products p ON oi.product_id = p.product_id WHERE p.category = 'Electronics';",
        check_type:"rows"
      },
      {
        id:"d5e5", title:"Top Customer Revenue Report",
        difficulty:"hard",
        desc:`<strong>Business Scenario:</strong> Build a customer revenue report joining all relevant tables. Show customer <code>name</code>, <code>city</code>, <code>tier</code>, number of <strong>delivered</strong> orders (<code>delivered_orders</code>), and total delivered revenue (<code>delivered_revenue</code>). Only include customers with at least 1 delivered order. Sort by delivered_revenue DESC.`,
        hint:"Filter by status = 'Delivered' in WHERE (or handle in HAVING). JOIN customers to orders. GROUP BY customer fields. HAVING COUNT(...) >= 1.",
        solution:"SELECT c.name, c.city, c.tier, COUNT(o.order_id) AS delivered_orders, SUM(o.total_amount) AS delivered_revenue FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id WHERE o.status = 'Delivered' GROUP BY c.customer_id, c.name, c.city, c.tier ORDER BY delivered_revenue DESC;",
        check_type:"rows"
      }
    ]
  },
  {
    day: 6,
    title: "Advanced JOINs — SELF JOIN & FULL OUTER",
    phase: "Intermediate",
    outcomes: ["SELF JOIN use cases", "FULL OUTER JOIN", "Cross JOIN concept", "Interview join patterns"],
    concepts: [
      {
        title: "Self Join & Full Outer Join",
        explain: `<strong>SELF JOIN</strong>: Joining a table to itself. Used for hierarchical data (manager-employee), comparing rows in the same table.<br><br><strong>FULL OUTER JOIN</strong>: Returns ALL rows from both tables. Where there's no match, NULLs fill the gaps.`,
        code: `<span class="cmt">-- SELF JOIN: compare customers in same city</span>
<span class="kw">SELECT</span>
  a.name <span class="kw">AS</span> customer1,
  b.name <span class="kw">AS</span> customer2,
  a.city
<span class="kw">FROM</span>      customers a
<span class="kw">INNER JOIN</span> customers b <span class="kw">ON</span> a.city <span class="op">=</span> b.city
<span class="kw">WHERE</span>     a.customer_id <span class="op"><</span> b.customer_id
<span class="kw">ORDER BY</span>  a.city;`
      }
    ],
    exercises: [
      {
        id:"d6e1", title:"Same-City Customers",
        difficulty:"easy",
        desc:`Use a SELF JOIN on the <code>customers</code> table to find pairs of customers who live in the <strong>same city</strong>. Show customer1 name, customer2 name, and city. Avoid duplicate pairs.`,
        hint:"Join customers AS a with customers AS b ON a.city = b.city, then WHERE a.customer_id < b.customer_id to avoid duplicates.",
        solution:"SELECT a.name AS customer1, b.name AS customer2, a.city FROM customers a INNER JOIN customers b ON a.city = b.city WHERE a.customer_id < b.customer_id ORDER BY a.city;",
        check_type:"rows"
      },
      {
        id:"d6e2", title:"All Products-Orders Match",
        difficulty:"easy",
        desc:`Show all products from the <code>products</code> table and any matching <code>order_items</code>. Include products that have never been ordered (they'll have NULL for order fields).`,
        hint:"LEFT JOIN products to order_items on product_id. Products with no orders will show NULL for item_id.",
        solution:"SELECT p.product_name, p.category, oi.order_id, oi.quantity FROM products p LEFT JOIN order_items oi ON p.product_id = oi.product_id ORDER BY p.product_name;",
        check_type:"rows"
      },
      {
        id:"d6e3", title:"Never-Ordered Products",
        difficulty:"medium",
        desc:`Find products that have <strong>never been ordered</strong>. Show only product_name and category.`,
        hint:"LEFT JOIN products to order_items, then WHERE oi.item_id IS NULL — this catches rows where there was NO match.",
        solution:"SELECT p.product_name, p.category FROM products p LEFT JOIN order_items oi ON p.product_id = oi.product_id WHERE oi.item_id IS NULL;",
        check_type:"rows"
      },
      {
        id:"d6e4", title:"Tier Comparison",
        difficulty:"medium",
        desc:`Using a SELF JOIN, find all pairs of customers where one is <strong>'Gold'</strong> tier and the other is <strong>'Platinum'</strong> tier. Show both names and their tiers.`,
        hint:"Join customers a with customers b. Filter WHERE a.tier = 'Gold' AND b.tier = 'Platinum'.",
        solution:"SELECT a.name AS gold_customer, b.name AS platinum_customer, a.tier, b.tier AS tier2 FROM customers a INNER JOIN customers b ON a.customer_id <> b.customer_id WHERE a.tier = 'Gold' AND b.tier = 'Platinum';",
        check_type:"rows"
      },
      {
        id:"d6e5", title:"Inactive Customer Report",
        difficulty:"hard",
        desc:`<strong>Business Scenario:</strong> Find customers who have <strong>NEVER placed an order</strong>. This is your re-engagement target list. Show their name, email, city, and tier. Sort by signup_date (oldest first — they've been dormant longest).`,
        hint:"LEFT JOIN customers to orders on customer_id. WHERE o.order_id IS NULL — these customers have no matching orders.",
        solution:"SELECT c.name, c.email, c.city, c.tier FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL ORDER BY c.signup_date ASC;",
        check_type:"rows"
      }
    ]
  },
  {
    day: 7,
    title: "Subqueries — Queries Within Queries",
    phase: "Intermediate",
    outcomes: ["Subquery in WHERE", "Subquery in FROM", "Correlated subqueries", "EXISTS operator"],
    concepts: [
      {
        title: "What is a Subquery?",
        explain: `A subquery is a <strong>SELECT inside another SELECT</strong>. The inner query runs first, and its result is used by the outer query. They're powerful for multi-step logic.`,
        code: `<span class="cmt">-- Subquery in WHERE (scalar)</span>
<span class="kw">SELECT</span> order_id, total_amount
<span class="kw">FROM</span>   orders
<span class="kw">WHERE</span>  total_amount <span class="op">></span> (
  <span class="kw">SELECT</span> <span class="fn">AVG</span>(total_amount) <span class="kw">FROM</span> orders
);

<span class="cmt">-- Subquery in FROM (derived table)</span>
<span class="kw">SELECT</span> city, total_customers
<span class="kw">FROM</span>  (
  <span class="kw">SELECT</span> city, <span class="fn">COUNT</span>(<span class="op">*</span>) <span class="kw">AS</span> total_customers
  <span class="kw">FROM</span>   customers
  <span class="kw">GROUP BY</span> city
) <span class="kw">AS</span> city_summary
<span class="kw">WHERE</span> total_customers <span class="op">>=</span> <span class="num">2</span>;`
      }
    ],
    exercises: [
      {
        id:"d7e1", title:"Above-Average Orders",
        difficulty:"easy",
        desc:`Find all orders where <code>total_amount</code> is <strong>above the average</strong> order value. Show order_id, customer_id, and total_amount.`,
        hint:"WHERE total_amount > (SELECT AVG(total_amount) FROM orders).",
        solution:"SELECT order_id, customer_id, total_amount FROM orders WHERE total_amount > (SELECT AVG(total_amount) FROM orders) ORDER BY total_amount DESC;",
        check_type:"rows"
      },
      {
        id:"d7e2", title:"Most Expensive Product Category",
        difficulty:"easy",
        desc:`Find all products that belong to the <strong>same category</strong> as the most expensive product (highest sell_price). Show product_name, category, and sell_price.`,
        hint:"Subquery: SELECT category FROM products WHERE sell_price = (SELECT MAX(sell_price) FROM products). Then outer: WHERE category = (above subquery).",
        solution:"SELECT product_name, category, sell_price FROM products WHERE category = (SELECT category FROM products WHERE sell_price = (SELECT MAX(sell_price) FROM products));",
        check_type:"rows"
      },
      {
        id:"d7e3", title:"Top Spending Customers",
        difficulty:"medium",
        desc:`Find customers whose <strong>total spend is above the average customer spend</strong>. Show customer_id and total_spent. Use a subquery in FROM to first calculate per-customer totals.`,
        hint:"Inner query: SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id. Then outer: WHERE total_spent > (SELECT AVG(...)). You may need to wrap it.",
        solution:"SELECT customer_id, total_spent FROM (SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id) AS cust_totals WHERE total_spent > (SELECT AVG(total_amount) FROM orders) ORDER BY total_spent DESC;",
        check_type:"rows"
      },
      {
        id:"d7e4", title:"Customers Who Ordered Electronics",
        difficulty:"medium",
        desc:`Using a subquery with <strong>IN</strong>, find all customers who have ordered at least one <strong>Electronics</strong> product. Show customer name and city.`,
        hint:"Subquery chain: get product_ids WHERE category='Electronics', then order_ids from order_items WHERE product_id IN (...), then customer_ids from orders WHERE order_id IN (...). Finally join to customers.",
        solution:"SELECT name, city FROM customers WHERE customer_id IN (SELECT customer_id FROM orders WHERE order_id IN (SELECT order_id FROM order_items WHERE product_id IN (SELECT product_id FROM products WHERE category = 'Electronics')));",
        check_type:"rows"
      },
      {
        id:"d7e5", title:"High-Value Customer Segment",
        difficulty:"hard",
        desc:`<strong>Business Scenario:</strong> Identify <em>Platinum or Gold</em> customers whose individual order amounts exceeded the average order value for their tier. Show customer name, tier, order_id, and order total. This helps find your highest-impact customers.`,
        hint:"This needs a correlated or multi-step approach. Join customers to orders, then filter WHERE total_amount > (subquery for avg by same tier). Or use a simpler version: find Gold/Platinum customers with any order > overall average.",
        solution:"SELECT c.name, c.tier, o.order_id, o.total_amount FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id WHERE c.tier IN ('Gold', 'Platinum') AND o.total_amount > (SELECT AVG(total_amount) FROM orders) ORDER BY o.total_amount DESC;",
        check_type:"rows"
      }
    ]
  },
  {
    day: 8,
    title: "CTEs — Clean, Readable SQL",
    phase: "Advanced",
    outcomes: ["WITH clause syntax", "Multi-step CTE logic", "CTE vs subquery", "Reusable query blocks"],
    concepts: [
      {
        title: "Common Table Expressions (CTEs)",
        explain: `A CTE (Common Table Expression) is a named temporary result set defined with <strong>WITH</strong>. It makes complex queries readable by breaking them into named steps. Think of it as creating a "temporary view" just for that query.`,
        code: `<span class="cmt">-- Single CTE</span>
<span class="kw">WITH</span> delivered_orders <span class="kw">AS</span> (
  <span class="kw">SELECT</span> customer_id, <span class="fn">SUM</span>(total_amount) <span class="kw">AS</span> revenue
  <span class="kw">FROM</span>   orders
  <span class="kw">WHERE</span>  status <span class="op">=</span> <span class="str">'Delivered'</span>
  <span class="kw">GROUP BY</span> customer_id
)
<span class="kw">SELECT</span> c.name, c.tier, d.revenue
<span class="kw">FROM</span>      customers c
<span class="kw">INNER JOIN</span> delivered_orders d <span class="kw">ON</span> c.customer_id <span class="op">=</span> d.customer_id
<span class="kw">ORDER BY</span>  d.revenue <span class="kw">DESC</span>;

<span class="cmt">-- Multiple CTEs chained</span>
<span class="kw">WITH</span>
  order_totals <span class="kw">AS</span> (
    <span class="kw">SELECT</span> customer_id, <span class="fn">COUNT</span>(<span class="op">*</span>) <span class="kw">AS</span> num_orders,
           <span class="fn">SUM</span>(total_amount) <span class="kw">AS</span> total_spent
    <span class="kw">FROM</span>   orders <span class="kw">GROUP BY</span> customer_id
  ),
  top_customers <span class="kw">AS</span> (
    <span class="kw">SELECT</span> <span class="op">*</span> <span class="kw">FROM</span> order_totals <span class="kw">WHERE</span> total_spent <span class="op">></span> <span class="num">3000</span>
  )
<span class="kw">SELECT</span> c.name, t.num_orders, t.total_spent
<span class="kw">FROM</span>      customers c
<span class="kw">INNER JOIN</span> top_customers t <span class="kw">ON</span> c.customer_id <span class="op">=</span> t.customer_id;`
      }
    ],
    exercises: [
      {
        id:"d8e1", title:"CTE: High Revenue Customers",
        difficulty:"easy",
        desc:`Write a CTE called <code>customer_revenue</code> that calculates total revenue per customer from orders. Then select customers with revenue above ₹3000, showing name and revenue.`,
        hint:"WITH customer_revenue AS (SELECT customer_id, SUM(...) FROM orders GROUP BY customer_id). Then JOIN to customers in the final SELECT.",
        solution:"WITH customer_revenue AS (SELECT customer_id, SUM(total_amount) AS revenue FROM orders GROUP BY customer_id) SELECT c.name, cr.revenue FROM customers c INNER JOIN customer_revenue cr ON c.customer_id = cr.customer_id WHERE cr.revenue > 3000 ORDER BY cr.revenue DESC;",
        check_type:"rows"
      },
      {
        id:"d8e2", title:"CTE: Category Avg vs Product",
        difficulty:"medium",
        desc:`Create a CTE <code>category_avg</code> that calculates average sell_price per category. Then show each product's name, its sell_price, and whether it's ABOVE or BELOW the category average (use a CASE statement).`,
        hint:"WITH category_avg AS (SELECT category, AVG(sell_price) AS avg_price FROM products GROUP BY category). Then JOIN products to this CTE and use CASE WHEN p.sell_price > ca.avg_price THEN 'Above' ELSE 'Below' END.",
        solution:"WITH category_avg AS (SELECT category, AVG(sell_price) AS avg_price FROM products GROUP BY category) SELECT p.product_name, p.sell_price, ROUND(ca.avg_price,0) AS cat_avg, CASE WHEN p.sell_price > ca.avg_price THEN 'Above Avg' ELSE 'Below Avg' END AS position FROM products p INNER JOIN category_avg ca ON p.category = ca.category ORDER BY p.category, p.sell_price DESC;",
        check_type:"rows"
      },
      {
        id:"d8e3", title:"Multi-CTE Pipeline",
        difficulty:"hard",
        desc:`<strong>Business Scenario:</strong> Build a 2-CTE pipeline: CTE1 = total orders and spend per customer. CTE2 = filter only customers with 2+ orders. Final query joins CTE2 to customers table showing name, city, tier, order count, and total spend. Sort by total_spent DESC.`,
        hint:"Chain two CTEs: WITH cte1 AS (...), cte2 AS (SELECT * FROM cte1 WHERE ...). Final SELECT joins customers to cte2.",
        solution:"WITH order_summary AS (SELECT customer_id, COUNT(*) AS num_orders, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id), multi_buyers AS (SELECT * FROM order_summary WHERE num_orders >= 2) SELECT c.name, c.city, c.tier, mb.num_orders, mb.total_spent FROM customers c INNER JOIN multi_buyers mb ON c.customer_id = mb.customer_id ORDER BY mb.total_spent DESC;",
        check_type:"rows"
      }
    ]
  },
  {
    day: 9,
    title: "Window Functions — Analytics Power",
    phase: "Advanced",
    outcomes: ["ROW_NUMBER()", "RANK() & DENSE_RANK()", "LAG() and LEAD()", "Running totals with SUM OVER"],
    concepts: [
      {
        title: "Window Functions",
        explain: `Window functions perform calculations <strong>across a set of rows related to the current row</strong>, WITHOUT collapsing them like GROUP BY does. You get both individual row detail AND aggregated calculations together.`,
        analogy: `🪟 Think of a sliding window that moves over your data. For each row, the window looks at a defined set of nearby rows and computes something (rank, running total, etc.). The original row is preserved.`,
        code: `<span class="cmt">-- ROW_NUMBER: unique sequential number</span>
<span class="kw">SELECT</span>
  name, total_amount,
  <span class="fn">ROW_NUMBER</span>() <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> total_amount <span class="kw">DESC</span>) <span class="kw">AS</span> rn
<span class="kw">FROM</span> orders <span class="kw">INNER JOIN</span> customers <span class="kw">USING</span>(customer_id);

<span class="cmt">-- RANK: same value = same rank, gaps after ties</span>
<span class="cmt">-- DENSE_RANK: same value = same rank, NO gaps</span>
<span class="kw">SELECT</span>
  product_name, sell_price,
  <span class="fn">RANK</span>()       <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> sell_price <span class="kw">DESC</span>) <span class="kw">AS</span> rnk,
  <span class="fn">DENSE_RANK</span>() <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> sell_price <span class="kw">DESC</span>) <span class="kw">AS</span> dense_rnk
<span class="kw">FROM</span> products;

<span class="cmt">-- PARTITION BY: window per group</span>
<span class="kw">SELECT</span>
  category, product_name, sell_price,
  <span class="fn">RANK</span>() <span class="kw">OVER</span> (<span class="kw">PARTITION BY</span> category <span class="kw">ORDER BY</span> sell_price <span class="kw">DESC</span>) <span class="kw">AS</span> rank_in_cat
<span class="kw">FROM</span> products;`
      }
    ],
    exercises: [
      {
        id:"d9e1", title:"Product Price Ranking",
        difficulty:"easy",
        desc:`Rank all products by <code>sell_price</code> (highest first) using <strong>DENSE_RANK()</strong>. Show product_name, sell_price, and the rank column named <code>price_rank</code>.`,
        hint:"DENSE_RANK() OVER (ORDER BY sell_price DESC) AS price_rank.",
        solution:"SELECT product_name, sell_price, DENSE_RANK() OVER (ORDER BY sell_price DESC) AS price_rank FROM products;",
        check_type:"rows"
      },
      {
        id:"d9e2", title:"Rank Within Category",
        difficulty:"medium",
        desc:`Rank products by <code>sell_price</code> <strong>within each category</strong> (highest first). Show category, product_name, sell_price, and rank_in_category. Use PARTITION BY.`,
        hint:"RANK() OVER (PARTITION BY category ORDER BY sell_price DESC) AS rank_in_category.",
        solution:"SELECT category, product_name, sell_price, RANK() OVER (PARTITION BY category ORDER BY sell_price DESC) AS rank_in_category FROM products ORDER BY category, rank_in_category;",
        check_type:"rows"
      },
      {
        id:"d9e3", title:"Running Revenue Total",
        difficulty:"medium",
        desc:`Show each order's order_id, order_date, total_amount, and a <strong>running total</strong> of revenue (cumulative sum) ordered by order_date. Call the running total <code>cumulative_revenue</code>.`,
        hint:"SUM(total_amount) OVER (ORDER BY order_date) AS cumulative_revenue. Window functions with ORDER BY create running totals by default.",
        solution:"SELECT order_id, order_date, total_amount, SUM(total_amount) OVER (ORDER BY order_date) AS cumulative_revenue FROM orders ORDER BY order_date;",
        check_type:"rows"
      },
      {
        id:"d9e4", title:"Top Product Per Category",
        difficulty:"hard",
        desc:`<strong>Interview classic:</strong> Get only the <strong>top 1 product per category</strong> by sell_price. Show category, product_name, and sell_price. Use a window function + CTE (not GROUP BY).`,
        hint:"CTE: SELECT *, RANK() OVER (PARTITION BY category ORDER BY sell_price DESC) AS rnk FROM products. Then outer: WHERE rnk = 1.",
        solution:"WITH ranked AS (SELECT product_name, category, sell_price, RANK() OVER (PARTITION BY category ORDER BY sell_price DESC) AS rnk FROM products) SELECT category, product_name, sell_price FROM ranked WHERE rnk = 1 ORDER BY category;",
        check_type:"rows"
      }
    ]
  },
  {
    day: 10,
    title: "LAG, LEAD & Advanced Window Frames",
    phase: "Advanced",
    outcomes: ["LAG() for previous row values", "LEAD() for next row values", "Moving averages", "NTILE for percentile buckets"],
    concepts: [
      {
        title: "LAG & LEAD — Looking Backwards and Forwards",
        explain: `<strong>LAG(column, n)</strong> gets the value from n rows BEFORE the current row.<br>
<strong>LEAD(column, n)</strong> gets the value from n rows AFTER the current row.<br><br>
These are crucial for month-over-month comparisons, detecting changes, and trend analysis.`,
        code: `<span class="cmt">-- LAG: compare each order to previous order</span>
<span class="kw">SELECT</span>
  order_id,
  order_date,
  total_amount,
  <span class="fn">LAG</span>(total_amount, <span class="num">1</span>) <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> order_date) <span class="kw">AS</span> prev_amount,
  total_amount <span class="op">-</span> <span class="fn">LAG</span>(total_amount,<span class="num">1</span>) <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> order_date) <span class="kw">AS</span> change
<span class="kw">FROM</span> orders
<span class="kw">ORDER BY</span> order_date;`
      }
    ],
    exercises: [
      {
        id:"d10e1", title:"Order-to-Order Comparison",
        difficulty:"easy",
        desc:`Use <strong>LAG()</strong> to show each order's total_amount alongside the previous order's amount (call it <code>prev_order_amount</code>). Order by order_date.`,
        hint:"LAG(total_amount, 1) OVER (ORDER BY order_date) AS prev_order_amount.",
        solution:"SELECT order_id, order_date, total_amount, LAG(total_amount, 1) OVER (ORDER BY order_date) AS prev_order_amount FROM orders ORDER BY order_date;",
        check_type:"rows"
      },
      {
        id:"d10e2", title:"Revenue Change Analysis",
        difficulty:"medium",
        desc:`Show order_id, order_date, total_amount, previous order amount, and the <strong>difference</strong> between current and previous (call it <code>revenue_change</code>). Use LAG().`,
        hint:"Subtract LAG result from current total_amount. You may need to wrap in a CTE or use the expression twice.",
        solution:"SELECT order_id, order_date, total_amount, LAG(total_amount,1) OVER (ORDER BY order_date) AS prev_amount, total_amount - LAG(total_amount,1) OVER (ORDER BY order_date) AS revenue_change FROM orders ORDER BY order_date;",
        check_type:"rows"
      },
      {
        id:"d10e3", title:"Customer Spend Quartiles",
        difficulty:"hard",
        desc:`<strong>Business Scenario:</strong> Bucket customers into 4 spend quartiles (1=lowest, 4=highest) based on their total order spend. Show customer_id, total_spent, and quartile. Use NTILE(4) and a CTE.`,
        hint:"CTE: SUM per customer. Then NTILE(4) OVER (ORDER BY total_spent ASC) AS quartile in the outer query.",
        solution:"WITH spend AS (SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id) SELECT customer_id, total_spent, NTILE(4) OVER (ORDER BY total_spent ASC) AS quartile FROM spend ORDER BY total_spent;",
        check_type:"rows"
      }
    ]
  },
  {
    day: 11,
    title: "Interview Patterns — Real World SQL",
    phase: "Advanced",
    outcomes: ["Top N per group", "Duplicate detection", "YoY analysis", "Date-based aggregations"],
    concepts: [
      {
        title: "Key Interview Query Patterns",
        explain: `Certain query patterns appear in almost every SQL interview. Master these and you can handle 80% of real-world data questions.`,
        code: `<span class="cmt">-- Pattern 1: Find duplicates</span>
<span class="kw">SELECT</span> email, <span class="fn">COUNT</span>(<span class="op">*</span>) <span class="kw">AS</span> cnt
<span class="kw">FROM</span>   customers
<span class="kw">GROUP BY</span> email
<span class="kw">HAVING</span> <span class="fn">COUNT</span>(<span class="op">*</span>) <span class="op">></span> <span class="num">1</span>;

<span class="cmt">-- Pattern 2: Top N per group (window fn)</span>
<span class="kw">WITH</span> ranked <span class="kw">AS</span> (
  <span class="kw">SELECT</span> <span class="op">*</span>,
    <span class="fn">DENSE_RANK</span>() <span class="kw">OVER</span>(
      <span class="kw">PARTITION BY</span> category
      <span class="kw">ORDER BY</span> sell_price <span class="kw">DESC</span>) <span class="kw">AS</span> rnk
  <span class="kw">FROM</span> products
)
<span class="kw">SELECT</span> category, product_name, sell_price
<span class="kw">FROM</span>   ranked
<span class="kw">WHERE</span>  rnk <span class="op"><=</span> <span class="num">2</span>;

<span class="cmt">-- Pattern 3: Month-over-month (string date)</span>
<span class="kw">SELECT</span>
  <span class="fn">LEFT</span>(order_date, <span class="num">7</span>)   <span class="kw">AS</span> month,
  <span class="fn">SUM</span>(total_amount)    <span class="kw">AS</span> revenue
<span class="kw">FROM</span>   orders
<span class="kw">GROUP BY</span> <span class="fn">LEFT</span>(order_date, <span class="num">7</span>)
<span class="kw">ORDER BY</span> month;`
      }
    ],
    exercises: [
      {
        id:"d11e1", title:"Monthly Revenue Trend",
        difficulty:"easy",
        desc:`Show total revenue per <strong>month</strong> (extract first 7 chars of order_date like '2024-01'). Call it <code>month</code> and <code>monthly_revenue</code>. Sort chronologically.`,
        hint:"Use LEFT(order_date, 7) to extract YYYY-MM. GROUP BY this extracted value.",
        solution:"SELECT LEFT(order_date, 7) AS month, SUM(total_amount) AS monthly_revenue FROM orders GROUP BY LEFT(order_date, 7) ORDER BY month;",
        check_type:"rows"
      },
      {
        id:"d11e2", title:"Top 2 Products Per Category",
        difficulty:"medium",
        desc:`Find the <strong>top 2 products per category</strong> by sell_price using DENSE_RANK(). Show category, product_name, sell_price, and rank.`,
        hint:"CTE with DENSE_RANK() OVER (PARTITION BY category ORDER BY sell_price DESC). Then WHERE rnk <= 2 in the outer query.",
        solution:"WITH ranked AS (SELECT category, product_name, sell_price, DENSE_RANK() OVER (PARTITION BY category ORDER BY sell_price DESC) AS rnk FROM products) SELECT category, product_name, sell_price, rnk FROM ranked WHERE rnk <= 2 ORDER BY category, rnk;",
        check_type:"rows"
      },
      {
        id:"d11e3", title:"Duplicate Email Detection",
        difficulty:"medium",
        desc:`Find any <code>city</code> values that appear more than <strong>twice</strong> in the customers table (customers grouped by city with count > 2). Show city and customer_count.`,
        hint:"GROUP BY city, HAVING COUNT(*) > 2.",
        solution:"SELECT city, COUNT(*) AS customer_count FROM customers GROUP BY city HAVING COUNT(*) > 2 ORDER BY customer_count DESC;",
        check_type:"rows"
      },
      {
        id:"d11e4", title:"Full KPI Dashboard Query",
        difficulty:"hard",
        desc:`<strong>Final Boss:</strong> Write ONE query (using CTEs) that produces a complete customer KPI report showing: customer name, tier, city, total orders, delivered orders, cancelled orders, total revenue, and average order value (rounded to 0). Sort by total_revenue DESC.`,
        hint:"JOIN customers to orders. Use COUNT(*) for total, SUM(CASE WHEN status='Delivered' THEN 1 ELSE 0 END) for delivered count. GROUP BY all customer fields.",
        solution:"SELECT c.name, c.tier, c.city, COUNT(o.order_id) AS total_orders, SUM(CASE WHEN o.status = 'Delivered' THEN 1 ELSE 0 END) AS delivered_orders, SUM(CASE WHEN o.status = 'Cancelled' THEN 1 ELSE 0 END) AS cancelled_orders, SUM(o.total_amount) AS total_revenue, ROUND(AVG(o.total_amount), 0) AS avg_order_value FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.name, c.tier, c.city ORDER BY total_revenue DESC;",
        check_type:"rows"
      }
    ]
  },
  {
    day: 12,
    title: "SQL Performance & DDL Basics",
    phase: "Pro",
    outcomes: ["INDEX concepts", "EXPLAIN plan reading", "CREATE TABLE", "Views & best practices"],
    concepts: [
      {
        title: "Performance & DDL",
        explain: `Understanding performance is what separates a good analyst from a great one. <strong>DDL (Data Definition Language)</strong> covers creating and modifying tables. <strong>Query optimization</strong> ensures your queries run fast on large datasets.`,
        code: `<span class="cmt">-- DDL: Create a new table</span>
<span class="kw">CREATE TABLE</span> regions (
  region_id   <span class="fn">INT</span>         <span class="kw">PRIMARY KEY</span>,
  region_name <span class="fn">VARCHAR</span>(<span class="num">50</span>) <span class="kw">NOT NULL</span>,
  country     <span class="fn">VARCHAR</span>(<span class="num">50</span>)
);

<span class="cmt">-- Create a VIEW (saved query)</span>
<span class="kw">CREATE VIEW</span> vw_delivered_orders <span class="kw">AS</span>
  <span class="kw">SELECT</span> o.<span class="op">*</span>, c.name, c.city
  <span class="kw">FROM</span> orders o
  <span class="kw">JOIN</span> customers c <span class="kw">ON</span> o.customer_id <span class="op">=</span> c.customer_id
  <span class="kw">WHERE</span> o.status <span class="op">=</span> <span class="str">'Delivered'</span>;

<span class="cmt">-- Performance tip: filter early, select less</span>
<span class="cmt">-- BAD:  SELECT * FROM huge_table WHERE col = 'x'</span>
<span class="cmt">-- GOOD: SELECT id, name FROM huge_table WHERE col = 'x'</span>`
      }
    ],
    exercises: [
      {
        id:"d12e1", title:"Create and Query a View",
        difficulty:"easy",
        desc:`In AlaSQL, create a CTE (acting as a view) called <code>high_value_orders</code> for all orders above ₹2000. Then query it to show order_id, customer_id, and total_amount.`,
        hint:"Use a CTE: WITH high_value_orders AS (SELECT ... FROM orders WHERE total_amount > 2000).",
        solution:"WITH high_value_orders AS (SELECT order_id, customer_id, total_amount FROM orders WHERE total_amount > 2000) SELECT * FROM high_value_orders ORDER BY total_amount DESC;",
        check_type:"rows"
      },
      {
        id:"d12e2", title:"Query Optimization Challenge",
        difficulty:"medium",
        desc:`Write the most efficient version of this request: <em>"Get the top 5 customers by total delivered revenue, showing their name and revenue."</em> Use a CTE, filter early, select only needed columns.`,
        hint:"Filter status='Delivered' in the CTE. Join to customers only for the name. Final query limits to 5.",
        solution:"WITH delivered AS (SELECT customer_id, SUM(total_amount) AS revenue FROM orders WHERE status = 'Delivered' GROUP BY customer_id) SELECT c.name, d.revenue FROM customers c INNER JOIN delivered d ON c.customer_id = d.customer_id ORDER BY d.revenue DESC LIMIT 5;",
        check_type:"rows"
      }
    ]
  },
  {
    day: 13,
    title: "Mini Project — End-to-End Analysis",
    phase: "Pro",
    outcomes: ["Full business analysis", "Multi-query report", "Storytelling with data", "Real-world SQL workflow"],
    concepts: [
      {
        title: "Your Mini Project",
        explain: `You've learned all the pieces. Now put them together. This is your capstone — a real analyst would be asked to answer these business questions from scratch. Work through them one by one.`,
        analogy: `📊 Project Brief: You're a Data Analyst at an e-commerce company. Your manager wants a complete Q1 2024 performance review. You have access to the full database. Answer 4 business questions using SQL.`
      }
    ],
    exercises: [
      {
        id:"d13e1", title:"Q1 Revenue Summary",
        difficulty:"medium",
        desc:`<strong>Project Task 1:</strong> Calculate total revenue, number of orders, and average order value for <strong>Q1 2024</strong> (Jan, Feb, Mar — order_date starts with '2024-01', '2024-02', or '2024-03'). Break it down by month.`,
        hint:"Filter order_date LIKE '2024-01%' OR '2024-02%' OR '2024-03%'. Use LEFT(order_date,7) to group by month.",
        solution:"SELECT LEFT(order_date, 7) AS month, COUNT(*) AS order_count, SUM(total_amount) AS revenue, ROUND(AVG(total_amount), 0) AS avg_order FROM orders WHERE order_date LIKE '2024-0%' AND order_date < '2024-04-01' GROUP BY LEFT(order_date, 7) ORDER BY month;",
        check_type:"rows"
      },
      {
        id:"d13e2", title:"Top 3 Customers",
        difficulty:"medium",
        desc:`<strong>Project Task 2:</strong> Who are the top 3 customers by total revenue across ALL time? Show name, tier, city, total orders, and total revenue.`,
        hint:"JOIN customers to orders, GROUP BY customer, SUM revenue, ORDER BY DESC, LIMIT 3.",
        solution:"SELECT c.name, c.tier, c.city, COUNT(o.order_id) AS total_orders, SUM(o.total_amount) AS total_revenue FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.name, c.tier, c.city ORDER BY total_revenue DESC LIMIT 3;",
        check_type:"rows"
      },
      {
        id:"d13e3", title:"Category Revenue Share",
        difficulty:"hard",
        desc:`<strong>Project Task 3:</strong> What percentage of total revenue does each product category contribute? Show category, category_revenue, total_revenue, and revenue_pct (rounded to 1 decimal). Use CTEs.`,
        hint:"CTE1: Join order_items to products, sum revenue per category. CTE2: total revenue. Final: JOIN and calculate percentage.",
        solution:"WITH cat_rev AS (SELECT p.category, SUM(oi.quantity * oi.unit_price) AS category_revenue FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id GROUP BY p.category), total AS (SELECT SUM(oi.quantity * oi.unit_price) AS total_revenue FROM order_items oi) SELECT cr.category, cr.category_revenue, t.total_revenue, ROUND(cr.category_revenue * 100.0 / t.total_revenue, 1) AS revenue_pct FROM cat_rev cr CROSS JOIN total t ORDER BY cr.category_revenue DESC;",
        check_type:"rows"
      },
      {
        id:"d13e4", title:"At-Risk Customer List",
        difficulty:"hard",
        desc:`<strong>Project Task 4:</strong> Identify customers who have <strong>only cancelled orders</strong> (every order they placed was cancelled). Show name, email, total orders placed, and total amount (which is all losses). These need urgent outreach.`,
        hint:"CTE: per customer, count total orders and count cancelled orders. Then filter WHERE total = cancelled. JOIN to customers for name/email.",
        solution:"WITH order_stats AS (SELECT customer_id, COUNT(*) AS total_orders, SUM(CASE WHEN status = 'Cancelled' THEN 1 ELSE 0 END) AS cancelled_orders, SUM(total_amount) AS total_amount FROM orders GROUP BY customer_id) SELECT c.name, c.email, os.total_orders, os.total_amount FROM customers c INNER JOIN order_stats os ON c.customer_id = os.customer_id WHERE os.total_orders = os.cancelled_orders ORDER BY os.total_amount DESC;",
        check_type:"rows"
      }
    ]
  },
  {
    day: 14,
    title: "Mock Interview — 20 Live Questions",
    phase: "Pro",
    outcomes: ["SQL interview readiness", "Pattern recognition", "Speed + accuracy", "Query review"],
    concepts: [
      {
        title: "Mock Interview Mode",
        explain: `You've made it to Day 14. Today is all about speed and pattern recognition. These 5 exercises simulate real interview questions. Time yourself — aim for under 3 minutes per question. No hints allowed on first attempt.`,
        analogy: `⏱️ Interview tip: Always verbalize your thinking. Say "I need to join X to Y because..." before writing. Interviewers value thinking process, not just correct answers.`
      }
    ],
    exercises: [
      {
        id:"d14e1", title:"Second Highest Order Value",
        difficulty:"medium",
        desc:`<strong>Interview Q1:</strong> Find the <strong>second highest</strong> total_amount in the orders table. Return just the amount value. (This is a classic interview trap — there are multiple ways to solve it!)`,
        hint:"Option A: SELECT MAX(total_amount) FROM orders WHERE total_amount < (SELECT MAX(total_amount) FROM orders). Option B: DENSE_RANK() in a CTE, WHERE rnk = 2.",
        solution:"SELECT MAX(total_amount) AS second_highest FROM orders WHERE total_amount < (SELECT MAX(total_amount) FROM orders);",
        check_type:"rows"
      },
      {
        id:"d14e2", title:"Customers With No Recent Orders",
        difficulty:"medium",
        desc:`<strong>Interview Q2:</strong> Find customers who have <strong>not placed any order in 2024</strong>. Show their name and email. (Hint: they may have older orders, or no orders at all.)`,
        hint:"Get customer_ids WITH 2024 orders. Then SELECT customers WHERE customer_id NOT IN (that list). Don't forget customers with NO orders at all.",
        solution:"SELECT name, email FROM customers WHERE customer_id NOT IN (SELECT DISTINCT customer_id FROM orders WHERE order_date LIKE '2024%');",
        check_type:"rows"
      },
      {
        id:"d14e3", title:"Running Total Per Customer",
        difficulty:"hard",
        desc:`<strong>Interview Q3:</strong> Show each order for customer 101, with a running cumulative total of their spending over time (ordered by order_date). Show order_id, order_date, total_amount, and running_total.`,
        hint:"SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date) gives a running total per customer.",
        solution:"SELECT order_id, order_date, total_amount, SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total FROM orders WHERE customer_id = 101 ORDER BY order_date;",
        check_type:"rows"
      },
      {
        id:"d14e4", title:"Rank Customers by Revenue",
        difficulty:"hard",
        desc:`<strong>Interview Q4:</strong> Assign a revenue rank to each customer (1 = highest total spend). Show customer name, total_spend, and their rank. Use DENSE_RANK().`,
        hint:"CTE: SUM per customer. Then DENSE_RANK() OVER (ORDER BY total_spend DESC). JOIN to customers for name.",
        solution:"WITH spend AS (SELECT customer_id, SUM(total_amount) AS total_spend FROM orders GROUP BY customer_id) SELECT c.name, s.total_spend, DENSE_RANK() OVER (ORDER BY s.total_spend DESC) AS revenue_rank FROM customers c INNER JOIN spend s ON c.customer_id = s.customer_id ORDER BY revenue_rank;",
        check_type:"rows"
      },
      {
        id:"d14e5", title:"Complete Business Report",
        difficulty:"hard",
        desc:`<strong>Final Interview Q — Put it all together:</strong> Write a comprehensive report showing each product category's: total items sold (sum of quantity), total revenue generated (quantity × unit_price from order_items), number of unique products sold, and revenue rank (1 = highest). Use CTEs and window functions.`,
        hint:"JOIN order_items to products. GROUP BY category. Calculate SUM(quantity), SUM(quantity*unit_price), COUNT(DISTINCT product_id). Then add RANK() OVER (ORDER BY revenue DESC).",
        solution:"WITH cat_stats AS (SELECT p.category, SUM(oi.quantity) AS total_units, SUM(oi.quantity * oi.unit_price) AS total_revenue, COUNT(DISTINCT oi.product_id) AS unique_products FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id GROUP BY p.category) SELECT category, total_units, total_revenue, unique_products, RANK() OVER (ORDER BY total_revenue DESC) AS revenue_rank FROM cat_stats ORDER BY revenue_rank;",
        check_type:"rows"
      }
    ]
  }
];

/* ── 3. SQL ENGINE (AlaSQL Wrapper) ─────────────────────────── */
const SQLEngine = {
  initialized: false,

  init() {
    if (this.initialized) return;
    try {
      // Drop existing tables first (in case of re-init)
      ['customers','products','orders','order_items'].forEach(t => {
        try { alasql(`DROP TABLE IF EXISTS ${t}`); } catch(e) {}
      });
      alasql(DB_SETUP);
      this.initialized = true;
      console.log('SQLEngine: Database initialized ✓');
    } catch(e) {
      console.error('SQLEngine init error:', e);
    }
  },

  run(sql) {
    try {
      const start = performance.now();
      const result = alasql(sql);
      const ms = (performance.now() - start).toFixed(1);
      return { ok: true, rows: Array.isArray(result) ? result : [], ms, scalar: !Array.isArray(result) ? result : null };
    } catch(e) {
      return { ok: false, error: e.message || String(e) };
    }
  },

  getSchema() {
    return [
      { name: 'customers', cols: [
        {name:'customer_id',type:'INT',note:'Primary key'},
        {name:'name',type:'STRING',note:''},
        {name:'email',type:'STRING',note:''},
        {name:'city',type:'STRING',note:''},
        {name:'signup_date',type:'STRING',note:'YYYY-MM-DD'},
        {name:'tier',type:'STRING',note:'Bronze/Silver/Gold/Platinum'},
      ]},
      { name: 'products', cols: [
        {name:'product_id',type:'INT',note:'Primary key'},
        {name:'product_name',type:'STRING',note:''},
        {name:'category',type:'STRING',note:''},
        {name:'cost_price',type:'NUMBER',note:''},
        {name:'sell_price',type:'NUMBER',note:''},
      ]},
      { name: 'orders', cols: [
        {name:'order_id',type:'INT',note:'Primary key'},
        {name:'customer_id',type:'INT',note:'→ customers'},
        {name:'order_date',type:'STRING',note:'YYYY-MM-DD'},
        {name:'status',type:'STRING',note:'Delivered/Cancelled/Shipped/Processing'},
        {name:'total_amount',type:'NUMBER',note:'₹ INR'},
      ]},
      { name: 'order_items', cols: [
        {name:'item_id',type:'INT',note:'Primary key'},
        {name:'order_id',type:'INT',note:'→ orders'},
        {name:'product_id',type:'INT',note:'→ products'},
        {name:'quantity',type:'INT',note:''},
        {name:'unit_price',type:'NUMBER',note:'₹ INR'},
      ]}
    ];
  }
};

/* ── 4. PROGRESS TRACKER ─────────────────────────────────────── */
const Progress = {
  _key: 'sqlmentor_v2',
  _data: null,

  load() {
    try {
      const raw = localStorage.getItem(this._key);
      this._data = raw ? JSON.parse(raw) : this._default();
    } catch(e) {
      this._data = this._default();
    }
    return this._data;
  },

  _default() {
    return {
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      completedDays: [],
      solvedExercises: [],
      queryHistory: []
    };
  },

  save() { localStorage.setItem(this._key, JSON.stringify(this._data)); },

  get xp() { return this._data.xp; },
  get streak() { return this._data.streak; },
  get completedDays() { return this._data.completedDays; },
  get solvedExercises() { return this._data.solvedExercises; },
  get history() { return this._data.queryHistory; },

  addXP(n) {
    this._data.xp += n;
    this.save();
  },

  markExercise(id) {
    if (!this._data.solvedExercises.includes(id)) {
      this._data.solvedExercises.push(id);
      this.save();
      return true; // was new
    }
    return false;
  },

  markDayComplete(d) {
    if (!this._data.completedDays.includes(d)) {
      this._data.completedDays.push(d);
    }
    this.save();
  },

  addHistory(sql, ok) {
    const entry = { sql: sql.trim(), ok, ts: new Date().toISOString() };
    this._data.queryHistory.unshift(entry);
    if (this._data.queryHistory.length > 50) this._data.queryHistory.pop();
    this.save();
  },

  checkStreak() {
    const today = new Date().toDateString();
    if (this._data.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (this._data.lastActiveDate === yesterday) {
        this._data.streak++;
      } else if (this._data.lastActiveDate !== today) {
        this._data.streak = 1;
      }
      this._data.lastActiveDate = today;
      this.save();
    }
  }
};

/* ── 5. UI HELPERS ───────────────────────────────────────────── */
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function toast(msg, type='info') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  $('#toastContainer').appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function closeModal(id) { $(`#${id}`).classList.remove('open'); }
function openModal(id)  { $(`#${id}`).classList.add('open'); }

function renderTable(rows) {
  if (!rows || rows.length === 0) return '<div class="output-success">✓ Query ran successfully (0 rows returned)</div>';
  const cols = Object.keys(rows[0]);
  const head = cols.map(c => `<th>${c}</th>`).join('');
  const body = rows.map(r => `<tr>${cols.map(c => `<td>${r[c] !== null && r[c] !== undefined ? r[c] : '<em style="color:var(--text-muted)">NULL</em>'}</td>`).join('')}</tr>`).join('');
  return `<div class="output-table-wrap"><table class="output-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function confettiBurst() {
  const canvas = $('#confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const pieces = Array.from({length:80}, () => ({
    x: Math.random()*canvas.width, y: Math.random()*canvas.height*0.5,
    r: Math.random()*5+3,
    c: ['#3b82f6','#22c55e','#f59e0b','#a855f7','#ef4444'][Math.floor(Math.random()*5)],
    vx: (Math.random()-0.5)*6, vy: Math.random()*4+2,
    alpha: 1
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p => {
      ctx.save(); ctx.globalAlpha=p.alpha; ctx.fillStyle=p.c;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill(); ctx.restore();
      p.x+=p.vx; p.y+=p.vy; p.alpha-=0.015; p.vy+=0.1;
    });
    if(++frame<80) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  draw();
}

/* ── 6. APP STATE ────────────────────────────────────────────── */
const State = {
  view: 'dashboard',  // 'dashboard' | 'lesson'
  currentDay: 1,
  currentExIdx: 0,
  solutionShown: false,
  hintShown: false
};

/* ── 7. RENDER FUNCTIONS ─────────────────────────────────────── */

function renderSidebar() {
  const phases = {
    'Foundation':   [1,2,3,4],
    'Intermediate': [5,6,7],
    'Advanced':     [8,9,10,11],
    'Pro':          [12,13,14]
  };
  let html = '';
  for (const [phase, days] of Object.entries(phases)) {
    html += `<div class="phase-label">${phase}</div>`;
    days.forEach(d => {
      const lesson = LESSONS[d-1];
      const done = Progress.completedDays.includes(d);
      const active = State.currentDay === d && State.view === 'lesson';
      html += `
        <div class="day-item ${done?'done':''} ${active?'active':''}" onclick="openDay(${d})">
          <div class="day-num-badge">${done ? '✓' : d}</div>
          <div class="day-item-info">
            <div class="day-item-title">${lesson.title.split('—')[0].trim()}</div>
            <div class="day-item-phase">${lesson.phase}</div>
          </div>
          <span class="check-icon">✓</span>
        </div>`;
    });
  }
  $('#dayList').innerHTML = html;
}

function renderDashboard() {
  State.view = 'dashboard';
  $('#dashView').style.display = '';
  $('#lessonView').style.display = 'none';
  $('#bcDay').textContent = 'Home';
  $('#bcTitle').textContent = 'Dashboard';

  const done = Progress.completedDays.length;
  const solved = Progress.solvedExercises.length;

  $('#ds-done').textContent = done;
  $('#ds-xp').textContent = Progress.xp;
  $('#ds-solved').textContent = solved;
  $('#ds-streak').textContent = Progress.streak;
  $('#completedCount').textContent = done;
  $('#globalBar').style.width = ((done/14)*100).toFixed(0)+'%';

  const phaseColors = {
    Foundation: '#3b82f6', Intermediate: '#a855f7', Advanced: '#14b8a6', Pro: '#f59e0b'
  };

  const grid = $('#dashGrid');
  grid.innerHTML = LESSONS.map(l => {
    const done = Progress.completedDays.includes(l.day);
    const pc = phaseColors[l.phase];
    const exCount = l.exercises.length;
    const solved = l.exercises.filter(e => Progress.solvedExercises.includes(e.id)).length;
    return `
      <div class="dash-day-card ${done?'done':''}" onclick="openDay(${l.day})" style="--phase-color:${pc}">
        <div class="ddc-top">
          <span class="ddc-day">Day ${l.day}</span>
          <span class="ddc-phase phase-${l.phase.toLowerCase()}">${l.phase}</span>
        </div>
        <div class="ddc-title">${l.title}</div>
        <div class="ddc-outcomes">
          ${l.outcomes.slice(0,3).map(o=>`<span class="ddc-tag">${o}</span>`).join('')}
        </div>
        <div class="ddc-footer">
          <span class="ddc-count">${solved}/${exCount} solved</span>
          <div class="ddc-status">${done ? '✓' : '→'}</div>
        </div>
      </div>`;
  }).join('');

  renderSidebar();
}

function renderLesson(dayNum) {
  State.view = 'lesson';
  State.currentDay = dayNum;
  State.currentExIdx = 0;

  const L = LESSONS[dayNum - 1];

  $('#dashView').style.display = 'none';
  $('#lessonView').style.display = '';
  $('#bcDay').textContent = `Day ${dayNum}`;
  $('#bcTitle').textContent = L.title;

  // Header
  $('#lessonHeader').innerHTML = `
    <div class="lh-day-label">Day ${dayNum} · ${L.phase}</div>
    <div class="lh-title">${L.title}</div>
    <div class="lh-outcomes">
      ${L.outcomes.map(o=>`<span class="lh-outcome">${o}</span>`).join('')}
    </div>`;

  // Concepts
  $('#conceptPanel').innerHTML = L.concepts.map((c, i) => `
    <div class="concept-block ${i===0?'open':''}" id="cb${i}">
      <div class="concept-header" onclick="toggleConcept(${i})">
        <span class="concept-num">${i+1}</span>
        <span class="concept-title">${c.title}</span>
        <span class="concept-chevron">▼</span>
      </div>
      <div class="concept-body">
        ${c.explain ? `<p class="concept-explain">${c.explain}</p>` : ''}
        ${c.analogy ? `<div class="analogy-box">${c.analogy}</div>` : ''}
        ${c.think   ? `<div class="think-box">${c.think}</div>` : ''}
        ${c.code    ? `
          <div class="code-block">
            <div class="code-block-header">
              <span class="code-lang">SQL</span>
              <button class="copy-code-btn" onclick="copyCode(this)">Copy</button>
            </div>
            <pre>${c.code}</pre>
          </div>` : ''}
      </div>
    </div>`).join('');

  // Exercise tabs
  renderExTabs(L);
  renderExercise(L, 0);

  // Nav dots
  const dots = Array.from({length:14},(_,i)=>i+1).map(d => {
    const cls = d === dayNum ? 'dot current' : Progress.completedDays.includes(d) ? 'dot done' : 'dot';
    return `<div class="${cls}" onclick="openDay(${d})" title="Day ${d}"></div>`;
  }).join('');
  $('#dayDots').innerHTML = dots;

  $('#prevDayBtn').disabled = dayNum <= 1;
  $('#nextDayBtn').disabled = dayNum >= 14;

  renderSidebar();
  updateTopbar();
}

function renderExTabs(L) {
  const tabs = L.exercises.map((e, i) => {
    const solved = Progress.solvedExercises.includes(e.id);
    const cls = `ex-tab ${i === State.currentExIdx ? 'active' : ''}`;
    const diffEmoji = {easy:'🟢',medium:'🟡',hard:'🔴'}[e.difficulty] || '';
    return `<div class="${cls}" onclick="switchEx(${i})">${diffEmoji} Ex ${i+1}${solved?' ✓':''}</div>`;
  }).join('');
  const meta = `${Progress.solvedExercises.filter(id => L.exercises.map(e=>e.id).includes(id)).length}/${L.exercises.length} solved`;
  $('#exTabs').innerHTML = tabs;
  $('#exMeta').textContent = meta;
}

function renderExercise(L, idx) {
  State.currentExIdx = idx;
  State.solutionShown = false;
  State.hintShown = false;
  const e = L.exercises[idx];

  const diffClass = {easy:'easy',medium:'medium',hard:'hard'}[e.difficulty];
  const diffLabel = {easy:'Easy',medium:'Medium',hard:'Hard'}[e.difficulty];

  $('#problemContent').innerHTML = `
    <span class="prob-diff diff-${diffClass}">${{easy:'●',medium:'●',hard:'●'}[e.difficulty]} ${diffLabel}</span>
    <div class="prob-title">${e.title}</div>
    <div class="prob-desc">${e.desc}</div>
    <div class="hint-section">
      <button class="hint-toggle" id="hintToggleBtn">💡 Show Hint</button>
      <div class="hint-body" id="hintBody">${e.hint}</div>
    </div>`;

  $('#hintToggleBtn').addEventListener('click', function() {
    const body = $('#hintBody');
    State.hintShown = !State.hintShown;
    body.classList.toggle('open', State.hintShown);
    this.textContent = State.hintShown ? '💡 Hide Hint' : '💡 Show Hint';
  });

  // Clear editor and output
  $('#sqlEditor').value = '';
  resetOutput();
  updateLineNumbers();
}

function resetOutput() {
  $('#outputArea').innerHTML = `
    <div class="output-placeholder">
      <span class="ph-icon">▷</span>
      <span>Run a query to see results</span>
    </div>`;
}

function updateTopbar() {
  $('#xpCount').textContent = Progress.xp;
  $('#streakCount').textContent = Progress.streak;
}

function updateLineNumbers() {
  const lines = $('#sqlEditor').value.split('\n').length;
  $('#lineNumbers').textContent = Array.from({length: Math.max(lines, 8)}, (_,i)=>i+1).join('\n');
}

/* ── 8. EVENT HANDLERS ───────────────────────────────────────── */

function toggleConcept(i) {
  const block = $(`#cb${i}`);
  block.classList.toggle('open');
}

function switchEx(idx) {
  const L = LESSONS[State.currentDay - 1];
  State.currentExIdx = idx;
  renderExTabs(L);
  renderExercise(L, idx);
}

function openDay(d) {
  renderLesson(d);
  // Scroll to top
  $('#main').scrollTo(0, 0);
}

function runQuery() {
  const sql = $('#sqlEditor').value.trim();
  if (!sql) { toast('Write a query first!', 'warn'); return; }

  const result = SQLEngine.run(sql);
  Progress.addHistory(sql, result.ok);

  const area = $('#outputArea');
  if (result.ok) {
    area.innerHTML = renderTable(result.rows) + `<div class="output-meta"><span>${result.rows.length} row${result.rows.length!==1?'s':''}</span><span>${result.ms}ms</span></div>`;
  } else {
    area.innerHTML = `<div class="output-error">⚠ ${result.error}</div>`;
  }
}

function checkAnswer() {
  const userSql = $('#sqlEditor').value.trim();
  if (!userSql) { toast('Write a query first!', 'warn'); return; }

  const L = LESSONS[State.currentDay - 1];
  const e = L.exercises[State.currentExIdx];

  const userResult = SQLEngine.run(userSql);
  const solResult  = SQLEngine.run(e.solution);

  if (!userResult.ok) {
    $('#outputArea').innerHTML = `<div class="output-error">⚠ ${userResult.error}</div>`;
    return;
  }

  // Compare result sets
  const match = compareResults(userResult.rows, solResult.rows);
  const area = $('#outputArea');

  if (match) {
    area.innerHTML = `<div class="output-success">✓ Correct! Your query output matches the expected result.</div>` + renderTable(userResult.rows) + `<div class="output-meta"><span>${userResult.rows.length} rows</span><span>${userResult.ms}ms</span></div>`;
    const isNew = Progress.markExercise(e.id);
    if (isNew) {
      const xpMap = {easy:10, medium:20, hard:35};
      Progress.addXP(xpMap[e.difficulty] || 10);
      confettiBurst();
      toast(`+${xpMap[e.difficulty]} XP! Exercise solved ✓`, 'success');
      updateTopbar();
      renderExTabs(L);

      // Check if day complete
      const allSolved = L.exercises.every(ex => Progress.solvedExercises.includes(ex.id));
      if (allSolved) {
        Progress.markDayComplete(State.currentDay);
        toast(`🎉 Day ${State.currentDay} complete! +50 bonus XP`, 'success');
        Progress.addXP(50);
        renderSidebar();
      }
    }
  } else {
    const userRows = userResult.rows.length;
    const solRows  = solResult.rows.length;
    area.innerHTML = `<div class="output-wrong">✗ Not quite. Your query returned ${userRows} rows, expected ${solRows}. Check your filters or JOIN conditions.</div>` + renderTable(userResult.rows);
  }
}

function compareResults(userRows, solRows) {
  if (userRows.length !== solRows.length) return false;
  if (userRows.length === 0) return true;

  // Compare sorted stringified rows
  const normalize = rows => rows.map(r =>
    Object.values(r).map(v => String(v===null||v===undefined?'NULL':v).toLowerCase().trim()).sort().join('|')
  ).sort().join(';;');

  return normalize(userRows) === normalize(solRows);
}

function showSolution() {
  const L = LESSONS[State.currentDay - 1];
  const e = L.exercises[State.currentExIdx];

  if (!State.solutionShown) {
    State.solutionShown = true;
    $('#sqlEditor').value = e.solution;
    updateLineNumbers();
    toast('Solution loaded. Study it, then try variations!', 'info');
  } else {
    toast('Solution already shown.', 'warn');
  }
}

function showHint() {
  const body = $('#hintBody');
  State.hintShown = !State.hintShown;
  body.classList.toggle('open', State.hintShown);
  const btn = $('#hintToggleBtn');
  if (btn) btn.textContent = State.hintShown ? '💡 Hide Hint' : '💡 Show Hint';
}

function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  const text = pre.textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1500);
  });
}

function renderSchemaModal() {
  const schema = SQLEngine.getSchema();
  $('#schemaBody').innerHTML = schema.map(t => `
    <div class="schema-table-block">
      <div class="schema-table-name">${t.name}<span>${t.cols.length} columns</span></div>
      <div class="schema-col-list">
        ${t.cols.map(c=>`
          <div class="schema-col">
            <span class="schema-col-name">${c.name}</span>
            <span class="schema-col-type">${c.type}</span>
            <span class="schema-col-note">${c.note}</span>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

function renderHistoryModal() {
  const h = Progress.history;
  if (h.length === 0) {
    $('#historyBody').innerHTML = '<p style="color:var(--text-muted);font-size:13px;text-align:center;padding:20px">No queries run yet. Start writing SQL!</p>';
    return;
  }
  $('#historyBody').innerHTML = h.slice(0,30).map(item => {
    const time = new Date(item.ts).toLocaleTimeString();
    return `
      <div class="history-item">
        <div class="history-meta">
          <span class="history-time">${time}</span>
          <span class="${item.ok?'history-status-ok':'history-status-err'}">${item.ok?'✓ OK':'✗ Error'}</span>
        </div>
        <div class="history-query" onclick="loadFromHistory(this)" data-sql="${item.sql.replace(/"/g,'&quot;')}">${item.sql.slice(0,120)}${item.sql.length>120?'...':''}</div>
      </div>`;
  }).join('');
}

function loadFromHistory(el) {
  if (State.view === 'lesson') {
    $('#sqlEditor').value = el.dataset.sql;
    updateLineNumbers();
    closeModal('historyModal');
    toast('Query loaded from history', 'info');
  }
}

/* ── 9. KEYBOARD SHORTCUTS ───────────────────────────────────── */
document.addEventListener('keydown', e => {
  // Ctrl+Enter = Run query
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    runQuery();
  }
  // Escape = close modals
  if (e.key === 'Escape') {
    $$('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});

// Tab key in editor
$('#sqlEditor')?.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const s = e.target.selectionStart;
    const end = e.target.selectionEnd;
    e.target.value = e.target.value.substring(0,s) + '  ' + e.target.value.substring(end);
    e.target.selectionStart = e.target.selectionEnd = s + 2;
  }
});

$('#sqlEditor')?.addEventListener('input', updateLineNumbers);
$('#sqlEditor')?.addEventListener('scroll', () => {
  $('#lineNumbers').scrollTop = $('#sqlEditor').scrollTop;
});

/* ── 10. WIRE UP BUTTONS ─────────────────────────────────────── */
$('#runBtn')?.addEventListener('click', runQuery);
$('#checkBtn')?.addEventListener('click', checkAnswer);
$('#hintBtn')?.addEventListener('click', showHint);
$('#solutionBtn')?.addEventListener('click', showSolution);

$('#clearBtn')?.addEventListener('click', () => {
  $('#sqlEditor').value = '';
  resetOutput();
  updateLineNumbers();
});

$('#copyBtn')?.addEventListener('click', () => {
  const sql = $('#sqlEditor').value;
  if (!sql) return;
  navigator.clipboard.writeText(sql).then(() => toast('Query copied!', 'info'));
});

$('#schemaBtn')?.addEventListener('click', () => {
  renderSchemaModal();
  openModal('schemaModal');
});

$('#historyBtn')?.addEventListener('click', () => {
  renderHistoryModal();
  openModal('historyModal');
});

$('#themeToggle')?.addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  $('#themeIcon').textContent = isDark ? '🌙' : '☀';
  localStorage.setItem('sqlmentor_theme', html.dataset.theme);
});

$('#prevDayBtn')?.addEventListener('click', () => {
  if (State.currentDay > 1) openDay(State.currentDay - 1);
});

$('#nextDayBtn')?.addEventListener('click', () => {
  if (State.currentDay < 14) openDay(State.currentDay + 1);
});

// Close modals clicking overlay
$$('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

/* ── 11. INIT ────────────────────────────────────────────────── */
function init() {
  // Load saved theme
  const savedTheme = localStorage.getItem('sqlmentor_theme');
  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
    $('#themeIcon').textContent = savedTheme === 'dark' ? '☀' : '🌙';
  }

  // Init progress
  Progress.load();
  Progress.checkStreak();

  // Init SQL engine
  SQLEngine.init();

  // Render dashboard
  renderDashboard();

  // Update top bar
  updateTopbar();

  console.log('SQLMentor ready ✓');
}

// Wait for AlaSQL to be available
if (typeof alasql !== 'undefined') {
  init();
} else {
  window.addEventListener('load', () => {
    setTimeout(init, 100);
  });
}
