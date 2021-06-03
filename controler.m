% Contruction regulation avec correcteur.

%z=z'-z0, i=i'-i0, vh=vh'-vh0 (x': absolu, x0: point d'équilibre, variation
%x autour du point d'equilibre
%z positif vers le bas
%if 1==1
%système-----------------
%F=-Ki i+Kz z (Ki,Kz>0)
%z=Ks i/(s^2Tm-1)
%Tm=sqrt(m/Kz): constante de temps mecanique
m=0.07;%masse de la sphère
Kz=28.4;
Ki=0.29;

Tm=sqrt(m/Kz);
Ks=-Ki/Kz;%gain du systeme
Kh=1/2.66;%gain du senseur a� effet hall Vh=Kh.z Kh=dVh/dz
Kir=1; %gain du regulateur de courant i=Kir*vi (vi=consigne)
Hs=tf(1,[Tm^2 0 -1]);% Tf du systeme (gain unitaire) 
figure;pzmap(Hs);

%régulateur------------
Tz=Tm;%compensation du pole stable
Tf=Tm/3;%pour obtenir 2 poles confondus en Tm en BF
Hr1=tf([Tz,1],[Tf,1]);%Régulateur lead-lag, gain unitaire : 1+sTm/1+sTf


%calcule de Kr (gain du régulateur)
BO=Hs*Hr1;
figure;rlocus(BO);
Kr=1.35;% (lu sur root locus)
BF=feedback(Kr*Hs*Hr1,1);
figure;pzmap(BF);
figure;step(BF);
%end
%implémentation numérique du lead-lag
u=1;%step reponse
[Y1,T1]=step(Hr1);
Te=1E-3;%période d'échantillonage
N=round(T1(end)/Te);
Y=zeros(N,1);T=zeros(N,1);I=zeros(N,1);
t=0;y=0;Y(1)=y;T(1)=t;i=0;
ki=Te/Tf 
ku=Tm/Tf
for k=1:N
    i=i+ki*(y-u);I(k)=i;
    y=ku*u-i;Y(k)=y; 
    t=t+Te;T(k)=t;
end
figure;plot(T,Y);hold;plot(T1,Y1,'r--');

Kr1=Kr/(Kir*Ks*Kh)
Te/Tf
