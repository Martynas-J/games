import Card from "@/components/Card/Card";

const Games = () => {
  return (
    <div className="flex gap-5 flex-wrap justify-center">
      <Card
        title={"Klausimų žaidimas"}
        description={
          "Tai yra klausimų viktorina. Žaidimas turintiems ir norintiems naujų žinių"
        }
        href={"games/quiz"}
        src="/Viktorina.png"
      />
      <Card
        title={"Stalo žaidimas"}
        description={
          "Ridenk kauliuka ir keliauk"
        }
        href="https://pirmasis-zaidimas.vercel.app/zaidimas2.html"
        src="/pimas-zaidimas.png"
      />
      <Card
        title={"Sukam"}
        description={
          "Pasitikrink savo Laimę!" 
        }
        href={"games/spin"}
        src="/spin.png"
      />
    
     
    </div>
  );
};

export default Games;
