export const recentOrders = [
  {
    id: "#12345",
    customer: "Sophia Clark",
    date: "2023-07-26",
    status: "Shipped",
    total: "$120.00",
  },
  {
    id: "#12346",
    customer: "Liam Walker",
    date: "2023-07-25",
    status: "Processing",
    total: "$85.00",
  },
  {
    id: "#12347",
    customer: "Olivia Carter",
    date: "2023-07-24",
    status: "Delivered",
    total: "$250.00",
  },
  {
    id: "#12348",
    customer: "Noah Bennett",
    date: "2023-07-23",
    status: "Shipped",
    total: "$150.00",
  },
  {
    id: "#12349",
    customer: "Ava Hayes",
    date: "2023-07-22",
    status: "Processing",
    total: "$95.00",
  },
];

export const topSellingProducts = [
  { name: "Premium T-Shirt", sales: 500, revenue: "$10,000" },
  { name: "Classic Hoodie", sales: 400, revenue: "$8,000" },
  { name: "Eco-Friendly Tote Bag", sales: 300, revenue: "$6,000" },
  { name: "Stainless Steel Water Bottle", sales: 250, revenue: "$5,000" },
  { name: "Leather Wallet", sales: 200, revenue: "$4,000" },
];

export const overviewData = [
  { name: "Jan", orders: 400 },
  { name: "Feb", orders: 300 },
  { name: "Mar", orders: 500 },
  { name: "Apr", orders: 280 },
  { name: "May", orders: 450 },
  { name: "Jun", orders: 350 },
  { name: "Jul", orders: 600 },
];

export const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 2780 },
  { name: "May", revenue: 1890 },
  { name: "Jun", revenue: 2390 },
  { name: "Jul", revenue: 1890 },
  { name: "Aug", revenue: 5000 },
  { name: "Sep", revenue: 1890 },
];

export const exampleText = `
<ul>
  <li>Brand Name : </li>
  <li>Product Info : </li>
  <li>Size Chart :</li>
</ul>
    `;

export const productTables: Record<string, string> = {
  default: `
  <table border="1" cellspacing="0" cellpadding="5">
    <thead>
      <tr>
        <th>Size</th>
        <th>Title1</th>
        <th>Title2</th>
        <th>Title3</th>
        <th>Ttile4</th>
        <th>Ttile5</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
      <tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
      <tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
    </tbody>
  </table>
  `,

  hoodie: `
  <table border="1" cellspacing="0" cellpadding="5">
    <thead>
      <tr>
        <th>Size</th>
        <th>Chest</th>
        <th>Height</th>
        <th>Shoulder Width</th>
        <th>Sleeve Length</th>
        <th>Waistline</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>S</td><td>102cm</td><td>66cm</td><td>43cm</td><td>64cm</td><td>-</td></tr>
      <tr><td>M</td><td>107cm</td><td>69cm</td><td>45cm</td><td>65cm</td><td>-</td></tr>
      <tr><td>L</td><td>112cm</td><td>71cm</td><td>47cm</td><td>66cm</td><td>-</td></tr>
      <tr><td>XL</td><td>119cm</td><td>74cm</td><td>50cm</td><td>67cm</td><td>-</td></tr>
    </tbody>
  </table>
  `,

  pant: `
  <table border="1" cellspacing="0" cellpadding="5">
    <thead>
      <tr>
        <th>Waist</th>
        <th>Hip</th>
        <th>Thigh</th>
        <th>Leg Opening</th>
        <th>Front Rise</th>
        <th>Back Rise</th>
        <th>Outseam</th>
        <th>Inseam</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>28"</td><td>38"</td><td>24"</td><td>19"</td><td>10"</td><td>14"</td><td>39"</td><td>29"</td></tr>
      <tr><td>30"</td><td>40"</td><td>25"</td><td>20"</td><td>11"</td><td>15"</td><td>40"</td><td>30"</td></tr>
      <tr><td>32"</td><td>42"</td><td>26"</td><td>21"</td><td>12"</td><td>16"</td><td>41"</td><td>30"</td></tr>
      <tr><td>34"</td><td>44"</td><td>27"</td><td>22"</td><td>12.5"</td><td>16.5"</td><td>42"</td><td>31"</td></tr>
      <tr><td>36"</td><td>46"</td><td>28"</td><td>23"</td><td>13"</td><td>17"</td><td>43"</td><td>31"</td></tr>
      <tr><td>38"</td><td>48"</td><td>29"</td><td>24"</td><td>13.5"</td><td>17.5"</td><td>44"</td><td>32"</td></tr>
    </tbody>
  </table>
`,

  shirt: `
  <table border="1" cellspacing="0" cellpadding="5">
    <thead>
      <tr>
        <th>Size</th>
        <th>Chest</th>
        <th>Body</th>
        <th>Shoulder</th>
        <th>Sleeve</th>
        <th>Waist</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>S</td><td>41"</td><td>28"</td><td>17"</td><td>24"</td><td>39"</td></tr>
      <tr><td>M</td><td>43"</td><td>29"</td><td>18"</td><td>25"</td><td>41"</td></tr>
      <tr><td>L</td><td>45"</td><td>30"</td><td>19"</td><td>25"</td><td>43"</td></tr>
      <tr><td>XL</td><td>48"</td><td>31"</td><td>20"</td><td>26"</td><td>45"</td></tr>
    </tbody>
  </table>
  `,

  shoes: `
  <table border="1" cellspacing="0" cellpadding="5">
    <thead>
      <tr>
        <th>EU</th>
        <th>35.5</th><th>36</th><th>36.5</th><th>37.5</th><th>38</th><th>38.5</th><th>39</th><th>40</th><th>40.5</th><th>41</th><th>42</th><th>42.5</th><th>43</th><th>44</th><th>44.5</th><th>45</th><th>45.5</th><th>46</th><th>47</th><th>47.5</th><th>48</th><th>48.5</th><th>49</th><th>49.5</th><th>50</th><th>50.5</th><th>51</th><th>51.5</th><th>52</th><th>52.5</th><th>53</th><th>53.5</th><th>54</th><th>54.5</th><th>55</th><th>55.5</th><th>56</th><th>56.5</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Foot Length (in)</td>
        <td>8 1/2</td><td>8 11/16</td><td>8 13/16</td><td>9</td><td>9 3/16</td><td>9 5/16</td><td>9 1/2</td><td>9 11/16</td><td>9 13/16</td><td>10</td><td>10 3/16</td><td>10 5/16</td><td>10 1/2</td><td>10 11/16</td><td>10 13/16</td><td>11</td><td>11 3/16</td><td>11 5/16</td><td>11 1/2</td><td>11 11/16</td><td>11 13/16</td><td>12</td><td>12 3/16</td><td>12 5/16</td><td>12 1/2</td><td>12 11/16</td><td>12 13/16</td><td>13</td><td>13 3/16</td><td>13 5/16</td><td>13 1/2</td><td>13 11/16</td><td>13 13/16</td><td>14</td><td>14 3/16</td><td>14 5/16</td><td>14 1/2</td><td>14 11/16</td>
      </tr>
    </tbody>
  </table>
  `,
};
